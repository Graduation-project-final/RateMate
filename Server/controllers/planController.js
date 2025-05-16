"use strict";
const { Plan } = require("../models");

const createPlan = async (req, res) => {
  try {
    const { name, description, monthly_price, yearly_price, features } =
      req.body;

    if (!name || !monthly_price) {
      return res
        .status(400)
        .json({ message: "Name and monthly_price are required." });
    }

    const newPlan = await Plan.create({
      name,
      description,
      monthly_price,
      yearly_price,
      features,
    });

    return res.status(201).json(newPlan);
  } catch (error) {
    console.error("Error creating plan", error);
    return res.status(500).json({ message: "Error creating plan", error });
  }
};

const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.findAll();

    if (plans.length === 0) {
      return res.status(404).json({ message: "No plans found." });
    }

    return res.status(200).json(plans);
  } catch (error) {
    console.error("Error retrieving plans", error);
    return res.status(500).json({ message: "Error retrieving plans", error });
  }
};

const getPlanById = async (req, res) => {
  const { id } = req.params;

  try {
    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found." });
    }

    return res.status(200).json(plan);
  } catch (error) {
    console.error("Error retrieving plan", error);
    return res.status(500).json({ message: "Error retrieving plan", error });
  }
};

const updatePlan = async (req, res) => {
  const { id } = req.params;
  const { name, description, monthly_price, yearly_price, features } = req.body;

  try {
    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found." });
    }

    await plan.update({
      name,
      description,
      monthly_price,
      yearly_price,
      features,
    });

    return res.status(200).json(plan);
  } catch (error) {
    console.error("Error updating plan", error);
    return res.status(500).json({ message: "Error updating plan", error });
  }
};

const deletePlan = async (req, res) => {
  const { id } = req.params;

  try {
    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found." });
    }

    await plan.destroy();

    return res.status(200).json({ message: "Plan deleted successfully." });
  } catch (error) {
    console.error("Error deleting plan", error);
    return res.status(500).json({ message: "Error deleting plan", error });
  }
};

module.exports = {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan,
};
