AI TASK MANAGER — Trello Board + Gemini AI

Quản lý công việc thông minh, tự sinh task bằng AI, kéo–thả như Trello.

<img width="1889" height="913" alt="image" src="https://github.com/user-attachments/assets/2d315dd0-067c-48a2-9a12-7948f75c00e2" />


🚀 1. Giới thiệu

AI Task Manager là ứng dụng quản lý công việc hiện đại, gồm:

Board 3 cột kiểu Trello (To-do / In Progress / Done)

Kéo–thả (Drag & Drop) để đổi trạng thái task

Sinh task bằng AI (Gemini 2.0 Flash)

Thêm / Sửa / Xoá task đầy đủ fields

MongoDB Atlas lưu trữ dữ liệu

UI đẹp Dark Mode + Tailwind CDN

Backend + Frontend tách biệt hoàn toàn

Ứng dụng rất phù hợp cho:

Học sinh / sinh viên quản lý công việc

Dev quản lý task

Tạo task tự động cho project


🧱 2. Công nghệ sử dụng
🔧 Backend

Node.js + Express

MongoDB Atlas

Mongoose ORM

Gemini 2.0 Flash API

dotenv, axios

nodemon

🎨 Frontend

React + Vite

Tailwind CSS CDN

Axios

@hello-pangea/dnd (drag & drop)

📁 3. Cấu trúc dự án
ai-task-manager/
│
├── backend/
│   ├── .env
│   ├── package.json
│   ├── sample_tasks.json
│   └── src/
│       ├── server.js
│       ├── models/
│       │   └── Task.js
│       ├── ai/
│       │   └── aiService.js
│       ├── controllers/
│       │   └── tasksController.js
│       ├── routes/
│       │   └── tasks.js
│       └── seed/
│           └── seedTasks.js
│
└── frontend/
    ├── index.html
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── services/api.js
        ├── components/
        │   ├── TaskCard.jsx
        │   ├── TaskForm.jsx
        │   └── TaskEditModal.jsx

🔐 4. Cấu hình môi trường (.env)

📌 File: backend/.env

PORT=4000
MONGO_URI=your-mongo-atlas-uri
GEMINI_KEY=your-google-api-key


MongoDB database: ai_task_manager
Collection: tasks

🧩 5. Chức năng hệ thống
✔ Tạo task thủ công

Tạo đầy đủ:

title

description

summary

estimated_time

status

✔ Tạo task bằng AI

Nhập mô tả → AI tự sinh:

Title chuyên nghiệp

Summary súc tích

Time estimate (1–12h)

Lưu trực tiếp vào DB

✔ Kéo — Thả (Drag & Drop)

Giống Trello, thay đổi status bằng kéo task giữa 3 cột.

✔ Edit task (đầy đủ fields)

Edit title

Edit description

Edit summary

Edit estimated_time

Edit status (dropdown)

✔ Delete task

Xoá và cập nhật ngay UI.

✔ Seed dữ liệu mẫu

npm run seed → nạp 3 task mẫu vào DB.

⚙️ 6. Cài đặt Backend
cd backend
npm install
npm run dev


Nếu OK:

🌿 Connected to MongoDB Atlas
🚀 Backend running on http://localhost:4000

Seed dữ liệu mẫu
npm run seed

🎨 7. Cài đặt Frontend
cd frontend
npm install
npm run dev


Truy cập:

👉 http://localhost:5173

🤖 8. Nâng cấp AI (Gemini 2.0 Flash)

AI được tối ưu để:

Tạo title chuyên nghiệp

Tạo summary ngắn gọn

Ước tính thời gian hợp lý (1–12h)

Tự động sửa lỗi grammar

Trả về JSON chuẩn (không markdown)

Không lỗi JSON Parse

📌 File cấu hình AI:
backend/src/ai/aiService.js

🖼 9. Giao diện
🟩 Form Create Task

Title

Description

Summary

Estimated time

Status (dropdown)

Nút “Generate with AI ✨”

🟦 Board kiểu Trello

Các task hiển thị gọn gàng

Kéo thả đổi cột

Hover đẹp

Edit/Delete trực quan

🧪 10. Gọi API mẫu (Postman)
Lấy danh sách task
GET /api/tasks

Thêm task
POST /api/tasks
Content-Type: application/json

{
  "title": "Build login page",
  "description": "Create UI + validation",
  "summary": "Short version",
  "estimated_time": 3,
  "status": "To-do"
}

Sửa task
PUT /api/tasks/:id

Xoá task
DELETE /api/tasks/:id

Generate AI
POST /api/tasks/ai/generate
{
  "description": "Build login page with validation"
}
