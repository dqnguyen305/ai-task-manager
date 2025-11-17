import { useState, useEffect } from "react";

export default function TaskEditModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [status, setStatus] = useState("To-do");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setSummary(task.summary);
      setEstimatedTime(task.estimated_time);
      setStatus(task.status);
    }
  }, [task]);

  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-xl w-[450px] border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>

        {/* Title */}
        <label className="text-sm">Title</label>
        <input
          className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <label className="text-sm">Description</label>
        <textarea
          className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Summary */}
        <label className="text-sm">Summary (AI)</label>
        <textarea
          className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-3"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        {/* Estimated time */}
        <label className="text-sm">Estimated time (hours)</label>
        <input
          type="number"
          className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-3"
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
        />

        {/* Status dropdown */}
        <label className="text-sm">Status</label>
        <select
          className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-4"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="To-do">To-do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-3 py-2 bg-gray-600 rounded hover:bg-gray-500"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSave(task._id, {
                title,
                description,
                summary,
                estimated_time: Number(estimatedTime),
                status,
              })
            }
            className="px-3 py-2 bg-blue-600 rounded hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
