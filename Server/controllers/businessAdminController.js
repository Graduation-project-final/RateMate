const { Subscription, User, Plan } = require("../models");

const getUserSubscriptions = async (req, res) => {
  const userId = req.userId;

  try {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: userId,
        status: "active",
      },
      include: [
        {
          model: Plan,
          as: "plan",
          attributes: null,
        },
      ],
    });

    if (subscriptions.length === 0) {
      return res
        .status(404)
        .json({ message: "No approved subscriptions found for this user" });
    }

    return res.status(200).json({ subscriptions });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving subscriptions" });
  }
};

module.exports = {
  getUserSubscriptions,
};
