"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    static associate(models) {
      Services.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Services.hasMany(models.Review, {
        foreignKey: "serviceId",
        as: "reviews",
      });
      Services.hasMany(models.Favorite, {
        foreignKey: "serviceId",
        as: "favorites",
      });

      Services.hasMany(models.Report, {
        foreignKey: "serviceId",
        as: "reports",
      });
    }
  }

  Services.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subcategory: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mainImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subImages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Services",
      tableName: "Services",
    }
  );

  return Services;
};
