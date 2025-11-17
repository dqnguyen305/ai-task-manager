import { useState } from "react";
import TaskCreateModal from "./TaskCreateModal";
import AIGenerateModal from "./AIGenerateModal";

export default function TaskForm({ onCreate, onAI }) {
  const [openCreate, setOpenCreate] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  return (
    <>
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <h2 className="text-xl font-bold mb-3">Create Task</h2>

        <div className="flex gap-3">
          <button
            onClick={() => setOpenCreate(true)}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
          >
            Create Task
          </button>

          <button
            onClick={() => setOpenAI(true)}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
          >
            Generate with AI (Popup)
          </button>
        </div>
      </div>

      {/* Create Task Popup */}
      <TaskCreateModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={onCreate}
      />

      {/* AI Popup */}
      <AIGenerateModal
        isOpen={openAI}
        onClose={() => setOpenAI(false)}
        onGenerate={async (txt) => {
          await onAI(txt); // ✔ tạo task luôn
          setOpenAI(false);
        }}
      />
    </>
  );
}
