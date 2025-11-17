import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  generateAI,
} from "./services/api";

import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import TaskEditModal from "./components/TaskEditModal";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // Load list task
  const fetchData = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create task (normal)
  const handleCreate = async (data) => {
    await createTask(data);
    fetchData();
  };

  // Delete task
  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchData();
  };

  // Generate task with AI
  const handleAI = async (description) => {
    if (!description) return alert("Nhập mô tả trước!");

    const res = await generateAI(description);

    await createTask({
      title: res.data.summary,
      description,
      summary: res.data.summary,
      estimated_time: res.data.estimated_time,
      status: "To-do",
    });

    fetchData();
  };

  // Open modal edit
  const handleEdit = (task) => {
    setEditingTask(task);
  };

  // Save edited task
  const handleSaveEdit = async (id, data) => {
    await updateTask(id, data);
    setEditingTask(null);
    fetchData();
  };

  // Drag & drop update status
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    await updateTask(taskId, { status: newStatus });
    fetchData();
  };

  // Group tasks by status
  const columns = {
    "To-do": {
      title: "To-do",
      tasks: tasks.filter((t) => t.status === "To-do"),
    },
    "In Progress": {
      title: "In Progress",
      tasks: tasks.filter((t) => t.status === "In Progress"),
    },
    Done: {
      title: "Done",
      tasks: tasks.filter((t) => t.status === "Done"),
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        AI Task Manager 🧠✨
      </h1>

      {/* Create task form */}
      <TaskForm onCreate={handleCreate} onAI={handleAI} />

      {/* Trello columns */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-6 mt-6">
          {Object.keys(columns).map((colId) => {
            const col = columns[colId];

            return (
              <Droppable droppableId={colId} key={colId}>
                {(provided) => (
                  <div
                    className="bg-gray-800 p-4 rounded-xl border border-gray-700 min-h-[500px]"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h2 className="text-xl mb-3 font-semibold text-primary">
                      {col.title}
                    </h2>

                    {col.tasks.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="mb-3"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              onDelete={handleDelete}
                              onEdit={handleEdit}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>

      {/* Edit modal */}
      <TaskEditModal
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
