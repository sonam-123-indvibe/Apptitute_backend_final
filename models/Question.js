const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  stream: String,      // MERN, Python, DataScience
  course: String,      // JavaScript, React, MongoDB
  level: String,       // easy, medium, hard
  type: String,        // mcq, coding
  question: String,
  options: [String],
  correctAnswer: String
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual id field for frontend compatibility
questionSchema.virtual('id').get(function() {
  return this._id.toString();
});

module.exports = mongoose.model("Question", questionSchema);

