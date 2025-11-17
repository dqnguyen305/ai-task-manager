const Task = require("../models/Task");
const { generateTaskAI } = require("../ai/aiService");

async function getTasks(req, res) {
  try {
    const tasks = await Task.find().sort({ created_at: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// POST /api/tasks  → Thêm task mới
async function createTask(req, res) {
  try {
    const { title, description, summary, estimated_time, status } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = new Task({
      title,
      description,
      summary,
      estimated_time,
      status: status || "To-do",
    });

    await task.save();
    return res.status(201).json(task);
  } catch (err) {
    console.error("createTask error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

// PUT /api/tasks/:id  → Sửa task
async function updateTask(req, res) {
  try {
    const id = req.params.id;

    const updated = await Task.findByIdAndUpdate(id, req.body, {
      new: true, // trả về bản đã cập nhật
      runValidators: true, // chạy validate schema
    });

    if (!updated) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("updateTask error:", err);
    res.status(500).json({ error: "Server error" });
  }
}


async function deleteTask(req, res) {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function updateTask(req, res) {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function generateAI(req, res) {
  try {
    const { description } = req.body;
    if (!description)
      return res.status(400).json({ error: "description is required" });

    const result = await generateTaskAI(description);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "AI error" });
  }
}

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  generateAI,
};
