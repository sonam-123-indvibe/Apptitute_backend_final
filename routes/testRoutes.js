const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
// Yahan badlav kiya hai: pura controller import kiya hai
const testController = require("../controllers/testController");
const sendResult = require("../utils/sendEmail");

// 1. Submit Test (Auth middleware ke saath)
router.post("/submit", auth, testController.submitTest);

// 2. Get User History (Jo error de raha tha, ab chalega)
router.get("/user-attempts/:userId", testController.getUserAttempts);

// 3. Manual Send Result (Optional)
router.post("/send-result", async (req, res) => {
  const { email, score } = req.body;
  try {
    await sendResult(email, score, "Manual result update");
    res.json({ message: "Email sent" });
  } catch (err) {
    res.status(500).json({ error: "Email failed" });
  }
});

module.exports = router;