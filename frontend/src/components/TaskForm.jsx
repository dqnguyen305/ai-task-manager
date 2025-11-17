import { useState } from "react";

export default function TaskForm({ onCreate, onAI }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [status, setStatus] = useState("To-do");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    onCreate({
      title: title.trim(),
      description: description.trim(),
      summary: summary.trim(),
      estimated_time: estimatedTime ? Number(estimatedTime) : null,
      status: status || "To-do",
    });

    // reset form
    setTitle("");
    setDescription("");
    setSummary("");
    setEstimatedTime("");
    setStatus("To-do");
  };

  const handleAIClick = () => {
    if (!description.trim()) {
      alert("Nhập mô tả (description) trước để AI phân tích nhé!");
      return;
    }
    onAI(description.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-4 rounded-xl border border-gray-700"
    >
      <h2 className="text-xl font-bold mb-3">Create Task</h2>

      {/* Title */}
      <input
        className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-3"
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Description */}
      <textarea
        className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-3"
        placeholder="Description (optional)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Summary */}
      <textarea
        className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-3"
        placeholder="Summary (optional, có thể copy từ AI)..."
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      {/* Estimated time */}
      <input
        type="number"
        className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-3"
        placeholder="Estimated time (hours)..."
        value={estimatedTime}
        onChange={(e) => setEstimatedTime(e.target.value)}
      />

      {/* Status dropdown */}
      <select
        className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-4"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="To-do">To-do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 px-3 py-2 rounded hover:bg-green-500"
        >
          Create Task
        </button>

        <button
          type="button"
          onClick={handleAIClick}
          className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-500"
        >
          Generate with AI ✨
        </button>
      </div>
    </form>
  );
}
