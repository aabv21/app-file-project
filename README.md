# App File Project

A full-stack file management application with automated CI/CD — backend deployed to Render, frontend to GitHub Pages, fully containerized with Docker Compose for local development.

🌐 **Frontend:** [aabv21.github.io/app-file-project](https://aabv21.github.io/app-file-project/)
⚙️ **Backend API:** [app-file-project-api.onrender.com](https://app-file-project-api.onrender.com)
📄 **API Docs:** [app-file-project-api.onrender.com/docs](https://app-file-project-api.onrender.com/docs)

> **Note:** The backend runs on Render's free tier and may sleep after inactivity. If the first request fails, wait a few seconds and retry.

---

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js_18-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│              GitHub Actions CI/CD                   │
│                                                     │
│  frontend-ci → frontend-deploy → GitHub Pages      │
│  backend-ci  → backend-deploy  → Render            │
└──────────────────┬──────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼────────┐   ┌────────▼────────┐
│   Frontend     │   │   Backend API   │
│   React 19     │──▶│   Express.js    │
│   Redux TK     │   │   Swagger docs  │
│   Vite         │   │   Node 18       │
│ GitHub Pages   │   │     Render      │
└────────────────┘   └─────────────────┘
        │                     │
        └──────────┬──────────┘
                   │
        ┌──────────▼──────────┐
        │   Docker Compose    │  ← local dev
        │  (api + frontend)   │
        └─────────────────────┘
```

---

## Key Features

- 📁 **File management** — full CRUD operations via REST API
- 📄 **Swagger docs** — interactive API documentation at `/docs`
- 🔄 **Full CI/CD** — 4 GitHub Actions workflows (lint + test + deploy per service)
- 🐳 **Docker Compose** — one command local setup for both services
- ⚡ **Vite** — fast frontend builds with HMR
- 🗃️ **Redux Toolkit** — predictable state management on the frontend
- 🚀 **Zero-config deploy** — push to `main` and both services deploy automatically

---

## CI/CD Workflows

| Workflow | Trigger | Action |
|---|---|---|
| `backend-ci.yml` | Push / PR | Lint + test backend |
| `backend-deploy.yml` | Push to `main` | Deploy to Render |
| `frontend-ci.yml` | Push / PR | Lint + test frontend |
| `frontend-deploy.yml` | Push to `main` | Build + deploy to GitHub Pages |

---

## Project Structure

```
app-file-project/
├── api/                    # Express.js REST API (Node 18)
│   └── README.md           # API-specific docs
├── frontend/               # React 19 SPA with Redux Toolkit + Vite
│   └── README.md           # Frontend-specific docs
├── .github/workflows/      # CI/CD pipelines
├── docker-compose.yml      # Local development environment
└── .env.example            # Environment variable template
```

---

## Local Development

**Prerequisites:** Docker & Docker Compose

### Option 1 — Full Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/aabv21/app-file-project.git
cd app-file-project

# Copy environment variables
cp .env.example .env

# Start all services
docker compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3000 |
| API Docs | http://localhost:3000/docs |

```bash
# Stop containers
docker compose down
```

### Option 2 — Hybrid (Backend Docker + Frontend local)

```bash
# Start only the backend
docker compose up api

# In another terminal
cd frontend
npm install
npm run dev
```

---

## Environment Variables

```bash
cp .env.example .env
```

See `.env.example` for all available configuration options.

**Required GitHub Secrets** for CI/CD:

| Secret | Description |
|---|---|
| `RENDER_DEPLOY_HOOK_URL` | Deploy hook URL from Render service settings |
| `VITE_API_BASE_URL` | Production API URL (your Render service URL) |

---

## Testing & Linting

```bash
# Backend
cd api
npm run lint
npm test

# Frontend
cd frontend
npm run lint
npm test
```

---

## Manual Deployment

```bash
# Trigger frontend deploy manually
gh workflow run frontend-deploy.yml

# Trigger backend deploy (push to main)
git push origin main
```

---

## Additional Documentation

- [API README](api/README.md)
- [Frontend README](frontend/README.md)

---

## Related Projects

- [B2BOrders](https://github.com/aabv21/B2BOrders) — B2B order management with AWS Lambda
- [photo-post](https://github.com/aabv21/photo-post) — Microservices with Kafka & Redis
- [cqrs-blog-app](https://github.com/aabv21/cqrs-blog-app) — CQRS pattern with microservices

---

<div align="center">
  <sub>Built by <a href="https://github.com/aabv21">Andrés Buelvas</a> · Full Stack Engineer</sub>
</div>
