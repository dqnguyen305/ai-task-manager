export default function AIGenerateModal({ onClose, onGenerate }) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!description.trim()) return;
    setLoading(true);

    const result = await onGenerate(description);

    setLoading(false);
    onClose(result); // trả summary + estimated_time về App.jsx
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-[#1e2530] p-6 rounded-xl w-[450px] shadow-xl border border-gray-700">
        <h2 className="text-xl font-bold mb-3">
          Generate Task with AI ✨
        </h2>

        <textarea
          className="w-full p-3 rounded bg-[#0f172a] border border-gray-600"
          rows="4"
          placeholder="Nhập mô tả để AI phân tích..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end mt-4 gap-3">
          <button
            onClick={() => onClose(null)}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
          >
            Cancel
          </button>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
}
