const express = require("express");
const router = express.Router();

const {
  createResult,
  getAllResults,
  getResultsByUserId,
  updateResult,
  deleteResult,
} = require("../controllers/resultController");

router.post("/", createResult);
router.get("/", getAllResults);
router.get("/user/:userId", getResultsByUserId);
router.put("/:id", updateResult);
router.delete("/:id", deleteResult);

module.exports = router;