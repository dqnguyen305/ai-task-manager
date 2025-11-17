const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const tasksRouter = require("./routes/tasks");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRouter);

const PORT = process.env.PORT || 4000; // ✔ Lấy PORT của Render

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🌿 Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
  });
