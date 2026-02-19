const Question = require("../models/Question");

const getQuestions = async (req, res) => {
  try {
    let { stream, course, level } = req.query;

    // trim FIRST
    stream = stream?.trim();
    course = course?.trim();
    level = level?.trim();

    // debug
    console.log({ stream, course, level });

    // THEN validate
    if (!stream || !level) {
      return res.status(400).json({ message: "Missing query params. Required: stream, level" });
    }

    // Build filter object with case-insensitive matching
    const filter = {
      stream: { $regex: `^${stream}$`, $options: "i" },
      level: { $regex: `^${level}$`, $options: "i" }
    };

    // Add course filter if provided (optional for backward compatibility)
    if (course) {
      filter.course = { $regex: `^${course}$`, $options: "i" };
    }

    // Fetch questions from database
    const questions = await Question.find(filter);

    res.status(200).json(questions);

  } catch (err) {
    console.error("Error fetching questions:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getQuestions };
