/**
 * Check Test Attempts Script
 * See what data is stored in test attempts
 */

require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/aptitude-site";
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

const checkAttempts = async () => {
  try {
    const attempts = await mongoose.connection.db.collection("testattempts")
      .find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();

    console.log("\n📋 Recent Test Attempts:");
    console.log("=".repeat(80));

    attempts.forEach((attempt, idx) => {
      console.log(`\n--- Attempt ${idx + 1} ---`);
      console.log(`ID: ${attempt._id}`);
      console.log(`User ID: ${attempt.userId}`);
      console.log(`Stream: ${attempt.stream || "Not stored"}`);
      console.log(`Level: ${attempt.level}`);
      console.log(`Status: ${attempt.status}`);
      console.log(`Score: ${attempt.score}`);
      console.log(`Answers Count: ${attempt.answers?.length || 0}`);

      if (attempt.answers && attempt.answers.length > 0) {
        console.log("\nFirst Answer Sample:");
        const firstAnswer = attempt.answers[0];
        console.log(`  - Question: ${firstAnswer.questionText || firstAnswer.question || "No question text"}`);
        console.log(`  - Type: ${firstAnswer.type || "No type"}`);
        console.log(`  - Options: ${firstAnswer.options ? JSON.stringify(firstAnswer.options) : "Not stored"}`);
        console.log(`  - Correct Answer: ${firstAnswer.correctAnswer || "Not stored"}`);
        console.log(`  - User Answer: ${firstAnswer.userAnswer || firstAnswer.answer || "No answer"}`);
      }
    });

    console.log("\n" + "=".repeat(80));
    console.log(`Total attempts: ${await mongoose.connection.db.collection("testattempts").countDocuments()}`);

  } catch (err) {
    console.error("❌ Error:", err.message);
  }
};

const runScript = async () => {
  try {
    await connectDB();
    await checkAttempts();
    process.exit(0);
  } catch (err) {
    console.error("❌ Script error:", err.message);
    process.exit(1);
  }
};

runScript();
