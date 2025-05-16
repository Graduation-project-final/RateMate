"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      Report.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Report.belongsTo(models.Services, {
        foreignKey: "serviceId",
        as: "service",
      });
    }
  }

  Report.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Report",
    }
  );

  return Report;
};
