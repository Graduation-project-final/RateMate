const { UserProfile, User } = require("../models");

const updateUserProfile = async (req, res) => {
  const userId = req.userId;
  const { phoneNumber, dateOfBirth, location, occupation, bio, name, email } =
    req.body;

  try {
    const parsedDate = new Date(dateOfBirth);
    if (dateOfBirth && isNaN(parsedDate)) {
      return res
        .status(400)
        .json({ message: "Invalid date format for dateOfBirth" });
    }
    const formattedDate = dateOfBirth
      ? parsedDate.toISOString().split("T")[0]
      : null;

    let userProfile = await UserProfile.findOne({ where: { userId } });

    if (!userProfile) {
      userProfile = await UserProfile.create({
        userId,
        phoneNumber,
        dateOfBirth: formattedDate,
        location,
        occupation,
        bio,
        coverPhoto: req.files.coverPhoto ? req.files.coverPhoto[0]?.path : null,
        profilePhoto: req.files.profilePhoto
          ? req.files.profilePhoto[0]?.path
          : null,
      });
    } else {
      userProfile = await userProfile.update({
        phoneNumber,
        dateOfBirth: formattedDate,
        location,
        occupation,
        bio,
        coverPhoto: req.files.coverPhoto
          ? req.files.coverPhoto[0]?.path
          : userProfile.coverPhoto,
        profilePhoto: req.files.profilePhoto
          ? req.files.profilePhoto[0]?.path
          : userProfile.profilePhoto,
      });
    }

    let user = await User.findOne({
      where: { id: userId },
      attributes: ["name", "email"],
    });

    await User.update(
      {
        name: name || user.name,
        email: email || user.email,
      },
      { where: { id: userId } }
    );

    const updatedProfile = await UserProfile.findOne({
      where: { userId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "email"],
        },
      ],
    });

    return res
      .status(200)
      .json({ message: "Profile updated successfully", updatedProfile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Error updating profile", error });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findOne({
      where: { id: userId },
      attributes: ["name", "email"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userProfile = await UserProfile.findOne({
      where: { userId },
    });

    return res.status(200).json({
      message: userProfile
        ? "Profile fetched successfully"
        : "Profile not found, but user data available",
      user: {
        name: user.name,
        email: user.email,
      },
      profile: userProfile || "Thair is no profile data ",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching profile", error });
  }
};

const getAllUsersWithProfiles = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
      where: {
        role: "user",
      },
      include: [
        {
          model: UserProfile,
          as: "profile",
          required: false,
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving users",
    });
  }
};

module.exports = { updateUserProfile, getUserProfile, getAllUsersWithProfiles };
