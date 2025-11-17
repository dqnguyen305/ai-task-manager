import { useState } from "react";

export default function AIGenerateModal({ isOpen, onClose, onGenerate }) {
  const [input, setInput] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl w-[420px] border border-gray-700 shadow-xl">
        <h2 className="text-2xl font-bold mb-3 text-white">Generate Task with AI ✨</h2>

        <textarea
          className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-3 text-white"
          placeholder="Nhập mô tả để AI phân tích..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
          >
            Cancel
          </button>

          <button
            onClick={() => onGenerate(input)}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
