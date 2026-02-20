const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../middleware/authMiddleware");
const adminAuth = require("../middleware/adminMiddleware");

// ==================== Existing Routes ====================
// All routes are protected with auth and adminAuth middleware
router.get("/pending-tests", adminController.getPendingTests);
router.post("/evaluate", adminController.evaluateTest);

// ==================== Question Management Routes ====================
// All routes are protected with auth and adminAuth middleware

// Add new question
router.post("/questions",  adminController.addQuestion);

// Get all questions with optional filters (stream, level, type)
router.get("/questions", adminController.getQuestions);

// Get single question by ID
router.get("/questions/:id", adminController.getQuestionById);

// Update question
router.put("/questions/:id", adminController.updateQuestion);

// Delete question
router.delete("/questions/:id", adminController.deleteQuestion);

module.exports = router;