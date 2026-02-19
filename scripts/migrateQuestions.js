/**
 * Question Migration Script
 * Migrates existing static questions from data/questions.js to MongoDB database
 *
 * Usage: node scripts/migrateQuestions.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Question = require("../models/Question");
const { htmlQuestions, pythonQuestions, javaQuestions } = require("../data/questions");

// Connect to MongoDB
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

// Convert static questions to database format
const migrateQuestions = async () => {
  try {
    // Clear existing questions (optional - comment out if you want to keep existing data)
    console.log("🗑️  Clearing existing questions...");
    await Question.deleteMany({});
    console.log("✅ Existing questions cleared");

    const allQuestions = [];
    let questionId = 1;

    // Helper function to process questions
    const processQuestions = (questionsObj, stream) => {
      const levels = ["easy", "medium", "hard"];

      levels.forEach(level => {
        const questions = questionsObj[level];
        if (!questions) return;

        questions.forEach(q => {
          allQuestions.push({
            stream: stream,
            level: level,
            type: q.type || "mcq",
            question: q.question,
            options: q.options || undefined,
            correctAnswer: q.correctAnswer || undefined
          });
          questionId++;
        });
      });
    };

    // Process HTML/MERN questions
    processQuestions(htmlQuestions, "MERN");

    // Process Python questions
    processQuestions(pythonQuestions, "Python");

    // Process Java questions
    processQuestions(javaQuestions, "Java");

    // Insert all questions into database
    console.log(`📝 Inserting ${allQuestions.length} questions into database...`);
    const result = await Question.insertMany(allQuestions);
    console.log(`✅ Successfully migrated ${result.length} questions`);

    // Display summary by stream
    const summary = await Question.aggregate([
      {
        $group: {
          _id: { stream: "$stream", level: "$level" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.stream": 1, "_id.level": 1 }
      }
    ]);

    console.log("\n📊 Migration Summary:");
    console.log("────────────────────────────────────────");
    summary.forEach(item => {
      console.log(`${item._id.stream} - ${item._id.level}: ${item.count} questions`);
    });
    console.log("────────────────────────────────────────");

    // Total count
    const totalCount = await Question.countDocuments();
    console.log(`\n✨ Total questions in database: ${totalCount}`);

  } catch (err) {
    console.error("❌ Migration error:", err.message);
    throw err;
  }
};

// Main execution
const runMigration = async () => {
  try {
    await connectDB();
    await migrateQuestions();
    console.log("\n🎉 Migration completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("\n💥 Migration failed:", err.message);
    process.exit(1);
  }
};

runMigration();
