const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Helper function to get questions with specific stream and level
const getQuestionsByStreamAndLevel = (stream, level) => {
  return async (req, res) => {
    try {
      const { course } = req.query;

      const filter = {
        stream: { $regex: `^${stream}$`, $options: "i" },
        level: { $regex: `^${level}$`, $options: "i" }
      };

      if (course) {
        filter.course = { $regex: `^${course}$`, $options: "i" };
      }

      const questions = await Question.find(filter);
      res.status(200).json(questions);
    } catch (err) {
      console.error("Error fetching questions:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
};

// Dynamic question fetching from database with query params
router.get("/questions", async (req, res) => {
  try {
    const { stream, level, course } = req.query;

    if (!stream || !level) {
      return res.status(400).json({ message: "Missing query params. Required: stream, level" });
    }

    const filter = {
      stream: { $regex: `^${stream}$`, $options: "i" },
      level: { $regex: `^${level}$`, $options: "i" }
    };

    if (course) {
      filter.course = { $regex: `^${course}$`, $options: "i" };
    }

    const questions = await Question.find(filter);
    res.status(200).json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Legacy routes for backward compatibility (HTML/MERN - defaults)
router.get("/questions/easy", getQuestionsByStreamAndLevel("MERN", "easy"));
router.get("/questions/medium", getQuestionsByStreamAndLevel("MERN", "medium"));
router.get("/questions/hard", getQuestionsByStreamAndLevel("MERN", "hard"));

// Python Questions - legacy routes
router.get("/questions/python/easy", getQuestionsByStreamAndLevel("Python", "easy"));
router.get("/questions/python/medium", getQuestionsByStreamAndLevel("Python", "medium"));
router.get("/questions/python/hard", getQuestionsByStreamAndLevel("Python", "hard"));

// Java Questions - legacy routes
router.get("/questions/java/easy", getQuestionsByStreamAndLevel("Java", "easy"));
router.get("/questions/java/medium", getQuestionsByStreamAndLevel("Java", "medium"));
router.get("/questions/java/hard", getQuestionsByStreamAndLevel("Java", "hard"));

module.exports = router;
