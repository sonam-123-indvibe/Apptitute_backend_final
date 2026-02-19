const mongoose = require("mongoose");

const testAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  stream: { type: String },  // MERN, Python, Java
  level: { type: String },   // easy, medium, hard
  answers: {
    type: Array,
    default: []  // Each item: { questionId, questionText, options, correctAnswer, userAnswer, type, isCorrect }
  },
  score: { type: Number, default: 0 },
  status: { type: String, default: "pending" },  // pending, evaluated
  submittedAt: { type: Date, default: Date.now },
  evaluatedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("TestAttempt", testAttemptSchema);