"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();
const { User, Subscription, Plan } = require("../models");
exports.createSubscription = async (req, res) => {
  const userId = req.userId;
  const {
    plan_id,
    billing_cycle,
    start_date,
    end_date,
    amount,
    company_name,
    contact_email,
    company_address,
    phone_number,
    website_url,
    business_description,
  } = req.body;

  try {
    if (
      !plan_id ||
      !billing_cycle ||
      !start_date ||
      !end_date ||
      !amount ||
      !company_name ||
      !contact_email
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (new Date(start_date) >= new Date(end_date)) {
      return res
        .status(400)
        .json({ message: "End date must be after start date." });
    }

    const userExists = await User.findByPk(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    const existingSubscription = await Subscription.findOne({
      where: { user_id: userId },
    });
    if (existingSubscription) {
      return res.status(400).json({
        message:
          "You already have a subscription. Contact admin to change or remove it.",
      });
    }

    const planExists = await Plan.findOne({ where: { plan_id: plan_id } });
    if (!planExists) {
      return res.status(404).json({ message: "Plan not found." });
    }

    const newSubscription = await Subscription.create({
      user_id: userId,
      plan_id: planExists.plan_id,
      billing_cycle,
      start_date,
      end_date,
      amount,
      company_name,
      contact_email,
      company_address,
      phone_number,
      website_url,
      business_description,
    });

    return res.status(201).json({
      message: "Subscription created successfully.",
      subscription: newSubscription,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return res.status(500).json({
      message: "An error occurred while creating the subscription.",
      error: "Internal Server Error",
    });
  }
};

exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: Plan,
          as: "plan",
          attributes: ["name"],
        },
      ],
    });

    if (subscriptions.length === 0) {
      return res.status(404).json({ message: "No subscriptions found." });
    }

    return res.status(200).json({
      message: "Subscriptions retrieved successfully.",
      subscriptions,
    });
  } catch (error) {
    console.error("Error retrieving subscriptions:", error);
    return res.status(500).json({
      message: "An error occurred while retrieving subscriptions.",
      error: "Internal Server Error",
    });
  }
};

exports.updateSubscriptionStatus = async (req, res) => {
  const { subscription_id, status } = req.body;

  try {
    if (
      !subscription_id ||
      !status ||
      (status !== "active" && status !== "declined")
    ) {
      return res.status(400).json({
        message:
          "Both subscription_id and a valid status ('active' or 'declined') are required.",
      });
    }

    const subscription = await Subscription.findOne({
      where: { subscription_id: subscription_id },
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found." });
    }

    subscription.status = status;
    await subscription.save();

    const user = await User.findOne({
      where: { id: subscription.user_id },
      attributes: ["email", "password"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    console.log("User data:", user.dataValues);

    if (status === "active") {
      const userId = subscription.user_id;

      if (userId) {
        const [updatedRows] = await User.update(
          { role: "business" },
          { where: { id: userId } }
        );

        if (updatedRows === 0) {
          console.error("No rows were updated for user ID:", userId);
        } else {
          console.log("User role updated successfully for ID:", userId);
        }

        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: "islamomar0003@gmail.com",
          to: user.email,
          subject: "Your Subscription Status Update",
          text:
            `Your subscription status has been updated to: ${status}\n\n` +
            `You have been granted the role of 'business'.\n\n` +
            `Please use the password you created when you set up your account to log in.\n` +
            `Here is your dashboard link: http://localhost:5174/dashboard/sign-in`,
        };

        await transporter.sendMail(mailOptions);
      } else {
        console.error("User ID is undefined.");
      }
    }

    return res.status(200).json({
      message:
        "Subscription status updated successfully." +
        (status === "active" ? " Email sent." : ""),
      subscription,
    });
  } catch (error) {
    console.error("Error updating subscription status:", error);
    return res.status(500).json({
      message: "An error occurred while updating the subscription status.",
      error: "Internal Server Error",
    });
  }
};
