"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    static associate(models) {
      Subscription.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Subscription.belongsTo(models.Plan, {
        foreignKey: "plan_id",
        as: "plan",
      });
    }
  }

  Subscription.init(
    {
      subscription_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "pending", "declined", "canceled"),
        allowNull: false,
        defaultValue: "pending",
      },
      billing_cycle: {
        type: DataTypes.ENUM("monthly", "yearly"),
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      company_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      contact_email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      company_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      website_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      business_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at", // Updated to match the migration
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "Subscription",
      tableName: "Subscriptions",
      timestamps: true,
      underscored: true,
    }
  );

  return Subscription;
};
