const TestAttempt = require("../models/TestAttempt");
const User = require("../models/User");
const Question = require("../models/Question");
const sendEmail = require("../utils/sendEmail");

exports.getPendingTests = async (req, res) => {
  try {
    const tests = await TestAttempt.find({ status: "pending" }).populate("userId", "name email");
    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.evaluateTest = async (req, res) => {
  try {
    const { attemptId, manualScore } = req.body;
    console.log("Updating Attempt ID:", attemptId);

    // 1. Check if ID is valid
    if (!attemptId) return res.status(400).json({ error: "Attempt ID is missing" });

    // 2. Update with $set to be sure
    const updated = await TestAttempt.findByIdAndUpdate(
      attemptId,
      {
        $set: {
          score: Number(manualScore),
          status: "evaluated"
        }
      },
      { new: true, runValidators: true } // runValidators se schema check hota hai
    ).populate("userId");

    // 3. Check if DB actually found and updated the record
    if (!updated) {
      console.log("❌ Database record not found for ID:", attemptId);
      return res.status(404).json({ error: "Test record not found in database" });
    }

    console.log("✅ DB Updated Successfully:", updated.status);

    // 4. Send Email
    if (updated.userId && updated.userId.email) {
      console.log("📧 Sending evaluation email to:", updated.userId.email);
      await sendEmail(updated.userId.email, manualScore, `Your test has been evaluated. Please check your dashboard for details.`);
    } else {
      console.log("⚠️ User email not found for sending evaluation result");
    }

    res.status(200).json({
      message: "Score updated and email sent!",
      updatedData: updated
    });

  } catch (err) {
    console.error("🔥 Backend Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ==================== Question CRUD Operations ====================

// Valid difficulty levels
const VALID_LEVELS = ["easy", "medium", "hard"];
const VALID_TYPES = ["mcq", "coding", "written"];

/**
 * Add a new question
 * POST /api/admin/questions
 */
exports.addQuestion = async (req, res) => {
  try {
    const { stream, level, type, question, options, correctAnswer } = req.body;

    // Validate required fields
    if (!stream || !level || !type || !question) {
      return res.status(400).json({
        error: "Missing required fields: stream, level, type, and question are required"
      });
    }

    // Validate level
    if (!VALID_LEVELS.includes(level)) {
      return res.status(400).json({
        error: `Invalid level. Must be one of: ${VALID_LEVELS.join(", ")}`
      });
    }

    // Validate type
    if (!VALID_TYPES.includes(type)) {
      return res.status(400).json({
        error: `Invalid type. Must be one of: ${VALID_TYPES.join(", ")}`
      });
    }

    // For MCQ type, options and correctAnswer are required
    if (type === "mcq" && (!options || !correctAnswer)) {
      return res.status(400).json({
        error: "For MCQ type, options and correctAnswer are required"
      });
    }

    // Create new question
    const newQuestion = new Question({
      stream: stream.trim(),
      level: level.trim().toLowerCase(),
      type: type.trim().toLowerCase(),
      question: question.trim(),
      options: type === "mcq" ? options : undefined,
      correctAnswer: type === "mcq" ? correctAnswer.trim() : undefined
    });

    const savedQuestion = await newQuestion.save();

    res.status(201).json({
      message: "Question added successfully",
      question: savedQuestion
    });

  } catch (err) {
    console.error("Error adding question:", err.message);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update an existing question
 * PUT /api/admin/questions/:id
 */
exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { stream, level, type, question, options, correctAnswer } = req.body;

    // Check if question exists
    const existingQuestion = await Question.findById(id);
    if (!existingQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Build update object with only provided fields
    const updateData = {};

    if (stream !== undefined) updateData.stream = stream.trim();
    if (question !== undefined) updateData.question = question.trim();
    if (type !== undefined) {
      if (!VALID_TYPES.includes(type)) {
        return res.status(400).json({
          error: `Invalid type. Must be one of: ${VALID_TYPES.join(", ")}`
        });
      }
      updateData.type = type.trim().toLowerCase();
    }
    if (level !== undefined) {
      if (!VALID_LEVELS.includes(level)) {
        return res.status(400).json({
          error: `Invalid level. Must be one of: ${VALID_LEVELS.join(", ")}`
        });
      }
      updateData.level = level.trim().toLowerCase();
    }
    if (options !== undefined) updateData.options = options;
    if (correctAnswer !== undefined) updateData.correctAnswer = correctAnswer.trim();

    // Validate MCQ requirements
    if ((existingQuestion.type === "mcq" || updateData.type === "mcq")) {
      const currentType = updateData.type || existingQuestion.type;
      const currentOptions = updateData.options !== undefined ? updateData.options : existingQuestion.options;
      const currentCorrectAnswer = updateData.correctAnswer !== undefined ? updateData.correctAnswer : existingQuestion.correctAnswer;

      if (currentType === "mcq" && (!currentOptions || !currentCorrectAnswer)) {
        return res.status(400).json({
          error: "For MCQ type, options and correctAnswer are required"
        });
      }
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Question updated successfully",
      question: updatedQuestion
    });

  } catch (err) {
    console.error("Error updating question:", err.message);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete a question
 * DELETE /api/admin/questions/:id
 */
exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({
      message: "Question deleted successfully",
      question: deletedQuestion
    });

  } catch (err) {
    console.error("Error deleting question:", err.message);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all questions with optional filters
 * GET /api/admin/questions?stream=Python&level=easy&type=mcq
 */
exports.getQuestions = async (req, res) => {
  try {
    const { stream, level, type } = req.query;

    // Build filter object
    const filter = {};

    if (stream) {
      filter.stream = stream.trim();
    }
    if (level) {
      if (!VALID_LEVELS.includes(level.toLowerCase())) {
        return res.status(400).json({
          error: `Invalid level. Must be one of: ${VALID_LEVELS.join(", ")}`
        });
      }
      filter.level = level.toLowerCase().trim();
    }
    if (type) {
      if (!VALID_TYPES.includes(type.toLowerCase())) {
        return res.status(400).json({
          error: `Invalid type. Must be one of: ${VALID_TYPES.join(", ")}`
        });
      }
      filter.type = type.toLowerCase().trim();
    }

    const questions = await Question.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      count: questions.length,
      questions
    });

  } catch (err) {
    console.error("Error fetching questions:", err.message);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get a single question by ID
 * GET /api/admin/questions/:id
 */
exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json(question);

  } catch (err) {
    console.error("Error fetching question:", err.message);
    res.status(500).json({ error: err.message });
  }
};