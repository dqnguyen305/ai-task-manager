export default function TaskCard({ task, onDelete, onEdit }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 hover:bg-gray-700">
      <h3 className="font-bold text-lg">{task.title}</h3>

      <p className="text-gray-300 text-sm">{task.description}</p>

      <p className="text-green-400 text-xs mt-1">AI: {task.summary}</p>

      <p className="text-yellow-300 text-xs">⏳ {task.estimated_time}h</p>

      <div className="flex justify-between text-sm mt-3">
        <button
          onClick={() => onEdit(task)}
          className="text-blue-400 hover:text-blue-200"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="text-red-400 hover:text-red-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
