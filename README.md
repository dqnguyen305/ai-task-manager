# 🚀 AI Task Manager

Ứng dụng quản lý công việc hiện đại kết hợp **giao diện Kanban kiểu Trello** và **trí tuệ nhân tạo Gemini** để tự động tạo task từ mô tả.

<img width="1867" height="923" alt="image" src="https://github.com/user-attachments/assets/2b450374-159a-4848-b3a1-cc3b243f7af9" />


---

## ✨ Tính năng nổi bật

* **Bảng Kanban 3 cột** (To-do → In Progress → Done)
* **Kéo – Thả** mượt mà bằng `@hello-pangea/dnd`
* **Sinh task tự động bằng AI (Gemini 2.0 Flash)**
* **Đầy đủ CRUD**: tạo – sửa – xoá
* **Giao diện Dark Mode** với Tailwind CSS
* **Lưu trữ trên MongoDB Atlas**
* **Frontend & Backend tách biệt chuyên nghiệp (MERN style)**

---

## 🛠 Công nghệ sử dụng

### Backend

* Node.js + Express
* MongoDB Atlas + Mongoose
* Google Gemini API
* Axios

### Frontend

* React 18 + Vite
* Tailwind CSS
* Axios
* @hello-pangea/dnd

---

## 📂 Cấu trúc dự án

```
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
```

---

## 🔐 Biến môi trường (.env)

File: `backend/.env`

```
PORT=4000
MONGO_URI=your-mongo-atlas-uri
GEMINI_KEY=your-google-api-key
```

---

## ⚙️ Cài đặt Backend

```bash
cd backend
npm install
npm run dev
```

Khởi tạo dữ liệu mẫu:

```bash
npm run seed
```

---

## 🎨 Cài đặt Frontend

```bash
cd frontend
npm install
npm run dev
```

Truy cập dự án:

```
http://localhost:5173
```

---

## 🤖 Cấu hình AI (Gemini 2.0 Flash)

File chính:

```
backend/src/ai/aiService.js
```

AI sẽ tự động tạo:

* Tiêu đề chuyên nghiệp
* Summary ngắn gọn
* Estimate thời gian (1–12 giờ)
* Trả về JSON sạch (không markdown)

---

## 📡 API Endpoints

### Lấy danh sách task

`GET /api/tasks`

### Tạo task

`POST /api/tasks`

```json
{
  "title": "Xây dựng trang đăng nhập",
  "description": "Tạo UI + xác thực",
  "summary": "Phiên bản rút gọn",
  "estimated_time": 3,
  "status": "To-do"
}
```

### Sửa task

`PUT /api/tasks/:id`

### Xoá task

`DELETE /api/tasks/:id`

### Sinh task bằng AI

`POST /api/tasks/ai/generate`

```json
{
  "description": "Tạo trang đăng nhập với validation"
}
```

---

## 📌 Giấy phép

MIT License – bạn có thể sử dụng và chỉnh sửa tự do.

---

## ⭐ Hỗ trợ dự án

Nếu dự án hữu ích, hãy **để lại một ngôi sao trên GitHub!**
