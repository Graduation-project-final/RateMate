"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductReview extends Model {
    static associate(models) {
      ProductReview.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      ProductReview.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }

  ProductReview.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ProductReview",
    }
  );

  return ProductReview;
};
