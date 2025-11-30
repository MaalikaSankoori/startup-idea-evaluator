# Startup Idea Evaluator

A full-stack web application that allows users to submit startup ideas and receive an AI-powered evaluation.

## Features

- **User Authentication**: Secure signup and login.
- **Idea Submission**: Detailed form for submitting startup concepts.
- **AI Evaluation**: Automated analysis of market potential, risks, and viability using OpenAI.
- **Dashboard**: Manage and review saved ideas.
- **Responsive Design**: Modern UI built with React and Tailwind CSS.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **AI**: OpenAI API

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)
- OpenAI API Key

### Local Development

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd startup-idea-evaluator
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    cp .env.example .env
    # Update .env with your credentials
    npm run dev
    ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## Deployment

### Backend (Render)
1.  Create a new Web Service on Render.
2.  Connect your repository.
3.  Set build command: `npm install`
4.  Set start command: `npm start`
5.  Add environment variables.

### Frontend (Vercel)
1.  Import project to Vercel.
2.  Set framework preset to Vite.
3.  Deploy.

## License

MIT
