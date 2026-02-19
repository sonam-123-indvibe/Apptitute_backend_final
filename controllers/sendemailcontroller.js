const Question = require("../models/Question");
const User = require("../models/User"); // User model zaroori hai email nikalne ke liye
const sendEmail = require("../utils/sendEmail"); // Jahan aapne sendEmail file rakhi hai
const htmlQuestions = require("../data/questions");

exports.submitTest = async (req, res) => {
  try {
    const { userId, answers, level } = req.body;

    // 1. Score Calculate Karein (Static File se)
    let score = 0;
    const questionsList = htmlQuestions[level];
    
    for (let qId in answers) {
      const question = questionsList.find(q => q.id === parseInt(qId));
      if (question && question.type === "mcq" && question.correctAnswer === answers[qId]) {
        score++;
      }
    }

    // 2. User ki Email ID nikalne ke liye Database se User dhundein
    const user = await User.findById(userId);
    
    if (user && user.email) {
      // 3. Email Bhejein
      await sendEmail(user.email, score);
      console.log(`Result email sent to: ${user.email}`);
    }

    res.json({ score, message: "Test submitted and email sent!" });

  } catch (err) {
    console.error("Submit Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};