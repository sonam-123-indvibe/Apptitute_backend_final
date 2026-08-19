const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const {
  htmlQuestions,
  pythonQuestions,
  javaQuestions,
  dataScienceQuestions,
} = require("../data/questions");

// Map stream name to static questions object
const staticQuestionsMap = {
  mern: htmlQuestions,
  python: pythonQuestions,
  java: javaQuestions,
  datascience: dataScienceQuestions,
};

router.get("/questions", async (req, res) => {
  try {
    const stream = req.query.stream?.trim();
    const level = req.query.level?.trim();

    if (!stream || !level) {
      return res.status(400).json({
        message: "Missing query params. Required: stream, level",
      });
    }

    // Try DB first
    let questions = await Question.find({
      stream: {
        $regex: `^${stream}$`,
        $options: "i",
      },
      level: {
        $regex: `^${level}$`,
        $options: "i",
      },
    });

    // Fallback to static file if DB is empty
    if (!questions || questions.length === 0) {
      console.log(
        `DB empty for ${stream}/${level}, serving from static file`
      );

      const staticData = staticQuestionsMap[stream.toLowerCase()];

      if (staticData && staticData[level.toLowerCase()]) {
        const staticQuestions = staticData[level.toLowerCase()].map(
          (q, i) => ({
            _id: `static_${stream}_${level}_${i}`,
            stream,
            level,
            type: q.type,
            question: q.question,
            options: q.options || [],
            correctAnswer: q.correctAnswer || "",
          })
        );

        return res.status(200).json(staticQuestions);
      }

      return res.status(200).json([]);
    }

    res.status(200).json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err.message);

    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

module.exports = router;