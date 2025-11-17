const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const Task = require("../models/Task");
const MONGO_URI = process.env.MONGO_URI;

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const filePath = path.join(__dirname, "../../sample_tasks.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const tasks = JSON.parse(raw);

    await Task.deleteMany({});
    await Task.insertMany(tasks);

    console.log("🌱 Seeded tasks:", tasks.length, "records");
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected");
  }
}

run();
