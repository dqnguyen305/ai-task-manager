import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask, generateAI } from "./services/api";
import AIGenerateModal from "./components/AIGenerateModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAIPopup, setShowAIPopup] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [status, setStatus] = useState("To-do");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const res = await getTasks();
    setTasks(res.data);
  }

  async function handleCreateTask() {
    if (!title.trim()) return alert("Title is required");

    await createTask({
      title,
      description,
      summary,
      estimated_time: estimatedTime ? Number(estimatedTime) : null,
      status,
    });

    // Reset
    setTitle("");
    setDescription("");
    setSummary("");
    setEstimatedTime("");
    setStatus("To-do");

    loadTasks();
  }

  // 🟦 Gọi AI khi popup bấm Generate
  async function handleAIGenerate(desc) {
    const res = await generateAI(desc);
    return res.data; // summary + estimated_time
  }

  // 🟩 Khi popup đóng và trả dữ liệu AI về
  function handleAIClose(result) {
    setShowAIPopup(false);

    if (result) {
      setSummary(result.summary);
      setEstimatedTime(result.estimated_time);
    }
  }

  return (
    <>
      {/* --- FORM CREATE TASK --- */}
      <div className="p-6 bg-[#0f1623] text-white">
        <h2 className="text-2xl mb-4">Create Task</h2>

        <input
          className="w-full p-3 mb-3 rounded bg-[#1d2635]"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-3 mb-3 rounded bg-[#1d2635]"
          placeholder="Description..."
          rows="2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          className="w-full p-3 mb-3 rounded bg-[#1d2635]"
          placeholder="Summary..."
          rows="2"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <input
          type="number"
          className="w-full p-3 mb-3 rounded bg-[#1d2635]"
          placeholder="Estimated time (hours)..."
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
        />

        <select
          className="w-full p-3 mb-3 rounded bg-[#1d2635]"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>To-do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <div className="flex gap-4">
          <button
            onClick={handleCreateTask}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-500"
          >
            Create Task
          </button>

          <button
            onClick={() => setShowAIPopup(true)}
            className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-600"
          >
            Generate with AI (Popup)
          </button>
        </div>
      </div>

      {/* --- POPUP AI --- */}
      {showAIPopup && (
        <AIGenerateModal
          onClose={handleAIClose}
          onGenerate={handleAIGenerate}
        />
      )}
    </>
  );
}

export default App;
