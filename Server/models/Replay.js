"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    static associate(models) {
      Reply.belongsTo(models.Review, { foreignKey: "reviewId", as: "review" });
      Reply.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }

  Reply.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Reply",
      tableName: "Replies",
      timestamps: true,
    }
  );

  return Reply;
};
