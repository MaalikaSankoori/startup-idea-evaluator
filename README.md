# Venturify – Startup Idea Evaluator

A full‑stack web application that allows users to submit startup ideas and receive an AI‑powered evaluation.

Venturify analyzes each idea’s market potential, risks, and feasibility using the Gemini API and stores results so users can review and compare ideas later.

## Features

- User Authentication: Secure signup and login.
- Idea Submission: Detailed form for submitting startup concepts.
- AI Evaluation: Automated analysis of market potential, risks, and viability using Gemini API.
- Dashboard: Manage and review saved ideas and their evaluations.
- Responsive Design: Modern UI built with React and Tailwind CSS.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express, MongoDB, Mongoose, JSON Web Tokens (JWT)
- AI: Gemini API (Google)
- Tooling: Git, npm

## Architecture Overview

- React frontend sends idea data and auth tokens to the backend via Axios.
- Express/Node backend exposes REST APIs for authentication, idea creation, and fetching evaluations.
- Backend calls the Gemini API with the idea details and parses the structured evaluation.
- Mongoose stores users and ideas (including AI evaluation fields) in MongoDB.
- Frontend displays evaluation scores, risks, and suggestions on a Result page.

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- Gemini API key (from Google AI Studio)

### 1. Clone the repository

```
git clone <repository-url>
cd startup-idea-evaluator
```

### 2. Backend setup

```
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set your own values, for example:

- `MONGO_URI` – your MongoDB connection string
- `GEMINI_API_KEY` – your Gemini API key
- `JWT_SECRET` – any strong random string

Then start the backend:

```
npm run dev
```

### 3. Frontend setup

In a new terminal:

```
cd frontend
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Deployment

### Backend (Render example)

1. Create a new Web Service on Render.
2. Connect this GitHub repository.
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables (e.g. `MONGO_URI`, `GEMINI_API_KEY`, `JWT_SECRET`).

### Frontend (Vercel example)

1. Import the project to Vercel.
2. Select the `frontend` directory as the root (if needed).
3. Set framework preset to Vite.
4. Ensure the API base URL points to your deployed backend.
5. Deploy.

## License

MIT
```


