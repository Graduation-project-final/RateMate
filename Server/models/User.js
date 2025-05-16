"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Services, {
        foreignKey: "userId",
        as: "services",
      });

      User.hasMany(models.Review, {
        foreignKey: "userId",
        as: "reviews",
      });

      User.hasOne(models.UserProfile, {
        foreignKey: "userId",
        as: "profile",
      });

      User.hasMany(models.Reply, {
        foreignKey: "userId",
        as: "replies",
      });

      User.hasMany(models.Subscription, {
        foreignKey: "user_id",
        as: "subscriptions",
      });

      User.hasMany(models.Product, {
        foreignKey: "userId",
        as: "products",
      });

      User.hasMany(models.Report, {
        foreignKey: "userId",
        as: "reports",
      });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("user", "business", "admin"),
        defaultValue: "user",
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      businessName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      otpExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetTokenExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
