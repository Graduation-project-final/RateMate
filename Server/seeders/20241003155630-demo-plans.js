"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Plans", [
      {
        name: "Basic Plan",
        description: "Basic subscription plan with limited features.",
        monthly_price: 49,
        yearly_price: 470,
        features: JSON.stringify({
          feature1: "Display up to 10 products",
          feature2: "Receive and respond to customer reviews",
          feature3: "Basic dashboard access",
          feature4: "Partner with 1 online store",
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Standard",
        description: "Standard subscription plan with additional features.",
        monthly_price: 99,
        yearly_price: 950,
        features: JSON.stringify({
          feature1: "Display up to 50 products",
          feature2: "Receive and respond to customer reviews",
          feature3: "Advanced dashboard access",
          feature4: "Partner with up to 3 online stores",
          feature5: "Priority customer support",
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Premium",
        description: "Premium subscription plan with all features included.",
        monthly_price: 199,
        yearly_price: 1900,
        features: JSON.stringify({
          feature1: "Unlimited product display",
          feature2: "Receive and respond to customer reviews",
          feature3: "Full dashboard access",
          feature4: "Partner with unlimited online stores",
          feature5: "24/7 dedicated support",
          feature6: "Custom integrations",
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Plans", null, {});
  },
};
