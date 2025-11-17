import { useState } from "react";

export default function TaskCreateModal({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [status, setStatus] = useState("To-do");

  const handleSubmit = () => {
    if (!title.trim()) return alert("Title is required!");

    onCreate({
      title,
      description,
      summary,
      estimated_time: estimatedTime ? Number(estimatedTime) : null,
      status,
    });

    setTitle("");
    setDescription("");
    setSummary("");
    setEstimatedTime("");
    setStatus("To-do");

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl w-[420px] border border-gray-700 shadow-xl">
        <h2 className="text-2xl font-bold mb-3 text-white">
          Create New Task 📝
        </h2>

        <input
          className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-3 text-white"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-3 text-white"
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-3 text-white"
          placeholder="Summary..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <input
          type="number"
          className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-3 text-white"
          placeholder="Estimated time (hours)..."
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
        />

        <select
          className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-4 text-white"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="To-do">To-do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
