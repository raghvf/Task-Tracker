# Task Tracker

A full-stack, production-ready task management web application built with the MERN stack. Organize tasks with search, filters, sorting, statistics, and a modern SaaS-style dashboard UI.

![Task Tracker Dashboard](./docs/screenshots/dashboard.png)

## Project Overview

Task Tracker is a responsive web application that lets users create, read, update, and delete tasks with rich metadata including status, priority, and due dates. The frontend is a React 19 SPA powered by Vite and TailwindCSS. The backend is a RESTful Express API backed by MongoDB Atlas.

## Features

### Core Functionality
- Full CRUD operations for tasks
- Real-time UI updates without page refresh
- Search tasks by title (debounced)
- Filter by status and priority
- Sort by newest, oldest, priority, or due date
- Task statistics dashboard (Total, Pending, In Progress, Completed)
- Pagination support
- Custom delete confirmation modal (no `window.confirm`)
- Toast notifications for success and error states
- Loading spinner and empty state UI

### Bonus Features
- Dark mode toggle with persistence
- Persistent filters in localStorage
- Responsive sidebar navigation
- Keyboard shortcuts (`N` new task, `Ctrl+K` search, `D` dark mode, `Esc` close modals)
- Debounced search
- Glassmorphism UI with gradient buttons

## Tech Stack

| Layer    | Technologies |
|----------|-------------|
| Frontend | React 19, Vite, React Router DOM, Axios, TailwindCSS, Lucide React, React Hot Toast |
| Backend  | Node.js, Express.js, MongoDB Atlas, Mongoose, dotenv, cors, helmet, morgan, express-validator |
| Deploy   | Vercel (Frontend), Render (Backend) |

## Folder Structure

```
task-tracker/
├── client/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── DeleteModal.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatsCards.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskModal.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/
│   │   │   └── useTasks.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── storage.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── notFound.js
│   │   └── validate.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── utils/
│   │   └── asyncHandler.js
│   ├── validators/
│   │   └── taskValidator.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── README.md
```

## Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- npm or yarn

### 1. Clone the repository

```bash
git clone <repository-url>
cd task-tracker
```

### 2. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` with your MongoDB URI and client URL:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/tasktracker?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend setup

Open a new terminal:

```bash
cd client
npm install
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Environment Variables

### Backend (`server/.env`)

## API Endpoints

| Method | Endpoint          | Description |
|--------|-------------------|-------------|
| GET    | /api/health       | Health check |
| GET    | /api/tasks        | Get all tasks (supports query params) |
| GET    | /api/tasks/:id    | Get task by ID |
| POST   | /api/tasks        | Create a new task |
| PUT    | /api/tasks/:id    | Update a task |
| DELETE | /api/tasks/:id    | Delete a task |

### Query Parameters (GET /api/tasks)

| Param    | Type   | Description |
|----------|--------|-------------|
| search   | string | Search by title/description |
| status   | string | Pending, In Progress, Completed |
| priority | string | Low, Medium, High |
| sort     | string | newest, oldest, priority, dueDate |
| page     | number | Page number (default: 1) |
| limit    | number | Items per page (default: 9) |

### Task Model

```json
{
  "title": "string (required, 3-100 chars)",
  "description": "string (max 500 chars)",
  "status": "Pending | In Progress | Completed",
  "priority": "Low | Medium | High",
  "dueDate": "ISO date string or null"
}
```

## MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Create a new cluster (M0 free tier is sufficient).
3. Under **Database Access**, create a database user with read/write permissions.
4. Under **Network Access**, add your IP address (or `0.0.0.0/0` for development).
5. Click **Connect** on your cluster, choose **Drivers**, and copy the connection string.
6. Replace `<username>`, `<password>`, and set the database name (e.g., `tasktracker`).
7. Paste the URI into `server/.env` as `MONGO_URI`.

## Deployment

### Backend — Render

1. Push your code to GitHub.
2. Go to [Render](https://render.com) and create a new **Web Service**.
3. Connect your repository and set:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add environment variables:
   - `MONGO_URI` — your Atlas connection string
   - `CLIENT_URL` — your Vercel frontend URL (e.g., `https://your-app.vercel.app`)
   - `PORT` — Render sets this automatically
5. Deploy and copy your Render service URL (e.g., `https://task-tracker-api.onrender.com`).

### Frontend — Vercel

1. Go to [Vercel](https://vercel.com) and import your GitHub repository.
2. Set:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Add environment variable:
   - `VITE_API_URL` — your Render backend URL + `/api` (e.g., `https://task-tracker-api.onrender.com/api`)
4. Deploy.
5. Update `CLIENT_URL` on Render to match your Vercel URL.

## Screenshots

| Dashboard | Dark Mode | Mobile |
|-----------|-----------|--------|
| ![Dashboard](./docs/screenshots/dashboard.png) | ![Dark Mode](./docs/screenshots/dark-mode.png) | ![Mobile](./docs/screenshots/mobile.png) |

> Place your screenshots in the `docs/screenshots/` folder.

## Future Improvements

- User authentication and authorization (JWT)
- Task categories and tags
- Drag-and-drop Kanban board view
- Email reminders for due dates
- Task sharing and collaboration
- Export tasks to CSV/PDF
- Real-time updates with WebSockets
- Unit and integration tests
- CI/CD pipeline with GitHub Actions

## License

MIT
