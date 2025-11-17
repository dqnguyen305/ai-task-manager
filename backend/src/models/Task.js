const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    // 📝 Tiêu đề task (bắt buộc)
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: 1,
      maxlength: 200,
    },

    // 🧾 Mô tả chi tiết task
    description: {
      type: String,
      default: "",
      trim: true,
    },

    // 🤖 AI summary
    summary: {
      type: String,
      default: "",
      trim: true,
    },

    // ⏳ Thời gian ước tính (giờ)
    estimated_time: {
      type: Number,
      default: null,
      min: 1,
      max: 60,
    },

    // 📌 Trạng thái task
    status: {
      type: String,
      enum: ["To-do", "In Progress", "Done"],
      default: "To-do",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Task", TaskSchema);
