const { Favorite, Services } = require("../models");

exports.createFavorite = async (req, res) => {
  try {
    const { serviceId } = req.body;
    const userId = req.userId;

    const favorite = await Favorite.create({
      userId,
      serviceId,
      status: "active",
    });

    res.status(201).json({ message: "Favorite added successfully", favorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding favorite", error });
  }
};

exports.getActiveFavorites = async (req, res) => {
  try {
    const userId = req.userId;

    const activeFavorites = await Favorite.findAll({
      where: {
        userId,
        status: "active",
      },
    });

    if (activeFavorites.length === 0) {
      return res.status(404).json({ message: "No active favorites found." });
    }

    res.status(200).json(activeFavorites);
  } catch (error) {
    console.error("Error fetching active favorites:", error);
    res.status(500).json({ message: "Error fetching active favorites", error });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { serviceId } = req.body;
    const userId = req.userId;

    const favorite = await Favorite.findOne({
      where: {
        userId,
        serviceId,
        status: "active",
      },
    });

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found." });
    }

    await favorite.destroy();

    res.status(200).json({ message: "Favorite removed successfully." });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ message: "Error removing favorite", error });
  }
};

exports.getFavoritesWithServices = async (req, res) => {
  try {
    const userId = req.userId;

    const favorites = await Favorite.findAll({
      where: {
        userId,
        status: "active",
      },
      include: [
        {
          model: Services,
          as: "service",
          required: true,
        },
      ],
    });

    if (favorites.length === 0) {
      return res.status(404).json({ message: "No active favorites found." });
    }

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites with services:", error);
    res
      .status(500)
      .json({ message: "Error fetching favorites with services", error });
  }
};
