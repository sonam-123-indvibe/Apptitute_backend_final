const User = require("../models/User");
const TestAttempt = require("../models/TestAttempt");
const Question = require("../models/Question");
const sendEmail = require("../utils/sendEmail");

exports.submitTest = async (req, res) => {
  try {
    const { userId, answers, level, stream = 'MERN' } = req.body;

    console.log("=== TEST SUBMISSION ===");
    console.log("Stream:", stream);
    console.log("Level:", level);
    console.log("User ID:", userId);
    console.log("Answers keys:", Object.keys(answers));

    // Fetch questions from database
    const questionsList = await Question.find({
      stream: { $regex: `^${stream}$`, $options: "i" },
      level: { $regex: `^${level}$`, $options: "i" }
    });

    console.log("Questions found in DB:", questionsList.length);

    if (!questionsList || questionsList.length === 0) {
      return res.status(400).json({ message: "Invalid Level or Stream or No questions found" });
    }

    let mcqScore = 0;
    let formatted = [];

    for (const qId in answers) {
      // Find question by MongoDB ID (using _id)
      const qData = questionsList.find(q => q._id.toString() === qId.toString());
      if (!qData) {
        console.log("Question not found for ID:", qId);
        continue;
      }

      console.log("Processing question:", qData.question);

      let isCorrect = (qData.type === "mcq" && qData.correctAnswer === answers[qId]);
      if (isCorrect) mcqScore++;

      // Store complete question data for admin review
      formatted.push({
        questionId: qId,
        questionText: qData.question,
        options: qData.options || [],  // Store MCQ options
        correctAnswer: qData.correctAnswer || "",  // Store correct answer
        userAnswer: answers[qId] || "",  // User's answer
        isCorrect: isCorrect,
        type: qData.type
      });
    }

    console.log("Formatted answers:", formatted.length);

    const newAttempt = new TestAttempt({
      userId,
      stream,
      level,
      answers: formatted,
      score: mcqScore,
      status: level === "easy" ? "evaluated" : "pending"
    });

    await newAttempt.save();
    console.log("Test attempt saved with ID:", newAttempt._id);

    // Send email for easy level tests
    if (level === "easy") {
      const user = await User.findById(userId);
      if (user && user.email) {
        console.log("Sending email to:", user.email, "for stream:", stream);
        await sendEmail(user.email, mcqScore, `Your ${stream} Easy Level result is here!`);
      }
    }

    return res.status(200).json({
      score: level === "easy" ? mcqScore : "Pending Review",
      message: "Success"
    });

  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get user test history
exports.getUserAttempts = async (req, res) => {
  try {
    const attempts = await TestAttempt.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
