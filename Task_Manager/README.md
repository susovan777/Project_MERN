# 📋 MERN Stack Task Manager

A simple, minimal, and clean task management application built using the MERN stack (MongoDB, Express, React, Node). This project demonstrates complete CRUD (Create, Read, Update, Delete) operations with a focus on clean RESTful API design and modern React state management.

---

### 🌐 Live Demo & API Endpoints

- **Live Frontend Application:** [Task Manager Live URL](https://task-manager-five-rose-72.vercel.app/) 
- **Deployed Backend APIs:** 
  - **GET All Tasks:** `/api/tasks`
  - **POST Create Task:** `/api/tasks`
  - **GET Single Task:** `/api/tasks/:id`
  - **PUT/PATCH Update Task:** `/api/tasks/:id`
  - **DELETE Task:** `/api/tasks/:id`


---

### ✨ Key Features

- **Tasks CRUD:** Full capability to create, view, update, and delete tasks.
- **Status Tracking:** Tasks are tracked with statuses: 'To Do', 'In Progress', 'Done'.
- **Minimalist UI:** Clean and responsive user interface built with plain CSS/React (using Vite).
- **Robust Error Handling:** Centralized Express middleware for consistent JSON error responses (404, 500, Mongoose validation).
- **CORS Enabled:** Configured to handle cross-origin requests from the frontend or any other client.

---

## 🛠️ Technology Stack

This section summarizes all the main technologies we used:

| Category       | Technology          | Purpose                                  |
| :------------- | :------------------ | :--------------------------------------- |
| **Backend**    | Node.js, Express.js | API server and routing                   |
| **Database**   | MongoDB, Mongoose   | NoSQL data storage and schema definition |
| **Frontend**   | React, Vite         | User interface and bundling              |
| **Utilities**  | Axios               | HTTP client for API requests             |
| **Middleware** | `cors`              | Enabled cross-origin requests            |

---

## ⚙️ Installation and Setup

This is the critical part for anyone running the project. Since it's a split-stack, we need steps for both folders. I'll provide the steps for the backend first.

### Prerequisites

- Node.js (LTS version)
- MongoDB (local installation or cloud service like Atlas)

### 1. Clone the Repository
   ```bash
   git clone https://github.com/susovan777/Project_Backend.git
   cd Task_Manager
   ```

### 2. Backend Setup (API)

1. Navigate to the backend directory (e.g., cd task-manager-backend).
2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Environment Variables: Create a file named .env in the backend root directory and add your database connection string and port:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   PORT=8000
   ```
4. Start the server:
   ```bash
   npm run dev # Or node server.js
   ```
   The API will run on http://localhost:8000 (or your deployed URL).

### 3. Frontend Setup (React/Vite)

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the client:

   ```bash
   npm run dev
   ```

   The client will typically start on http://localhost:5173.
