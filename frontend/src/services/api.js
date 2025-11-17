import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const getTasks = () => API.get("/tasks");
export const createTask = (data) => API.post("/tasks", data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);

export const generateAI = (description) =>
  API.post("/tasks/ai/generate", { description });
