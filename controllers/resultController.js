const Results = require("../models/Result");

// CREATE RESULT
const createResult = async (req, res) => {
  try {
    const { Name, userId, Email, Score } = req.body;

    const result = await Results.create({
      Name,
      userId,
      Email,
      Score,
    });

    return res.status(201).json({
      success: true,
      message: "Result created successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating result",
      error: error.message,
    });
  }
};

// GET ALL RESULTS
const getAllResults = async (req, res) => {
  try {
    const results = await Results.find();

    return res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching results",
      error: error.message,
    });
  }
};

// GET RESULTS BY USER ID
const getResultsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const results = await Results.find({ userId });

    return res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user results",
      error: error.message,
    });
  }
};

// UPDATE RESULT
const updateResult = async (req, res) => {
  try {
    const result = await Results.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Result updated successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating result",
      error: error.message,
    });
  }
};

// DELETE RESULT
const deleteResult = async (req, res) => {
  try {
    const result = await Results.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Result deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting result",
      error: error.message,
    });
  }
};

module.exports = {
  createResult,
  getAllResults,
  getResultsByUserId,
  updateResult,
  deleteResult,
};

