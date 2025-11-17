const express = require("express");
const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  generateAI,
} = require("../controllers/tasksController");

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);
router.post("/ai/generate", generateAI);

module.exports = router;
