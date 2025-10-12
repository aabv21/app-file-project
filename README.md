# App File Project

Full-stack application with automated CI/CD deployment to Render (backend) and GitHub Pages (frontend).

## 🚀 Live Deployment

- **Frontend**: https://aabv21.github.io/app-file-project/
- **Backend API**: https://app-file-project-api.onrender.com
- **API Docs**: https://app-file-project-api.onrender.com/docs

> **Note:** The backend runs on Render's free tier and may sleep after long inactivity. If the first request fails, wait a few seconds and refresh so the service can wake up.

## 📁 Repository Structure

- **`api/`** – Express.js REST API with Swagger documentation (Node 18)
- **`frontend/`** – React 19 SPA with Redux Toolkit and Vite (Node 18)
- **`docker-compose.yml`** – Local development environment
- **`.github/workflows/`** – CI/CD pipelines

## 🛠️ Local Development

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (optional, for running outside Docker)

### Option 1: Full Docker Setup (Recommended)

```bash
# Copy environment variables
cp .env.example .env

# Start all services
docker compose up --build

# Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
# API Docs: http://localhost:3000/docs

# Stop containers
docker compose down
```

### Option 2: Hybrid Setup (Backend in Docker, Frontend local)

```bash
# Start only the backend
docker compose up api

# In another terminal, run frontend locally
cd frontend
npm install
npm run dev
```

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure as needed:

```bash
cp .env.example .env
```

See `.env.example` for all available configuration options.

## 🚢 Deployment

### Automatic Deployment

Both services deploy automatically on push to `main`:

- **Backend**: Deploys to Render via deploy hook
- **Frontend**: Deploys to GitHub Pages

### Required GitHub Secrets

Configure these in your repository settings (`Settings → Secrets and variables → Actions`):

- **`RENDER_DEPLOY_HOOK_URL`**: Deploy hook URL from Render service settings
- **`VITE_API_BASE_URL`**: Production API URL (e.g., your Render service URL)
- Backend environment variables (see `.env.example` for the complete list)

### Manual Deployment

Trigger deployments manually via GitHub Actions:

```bash
# Deploy frontend
gh workflow run frontend-deploy.yml

# Deploy backend (via push to main)
git push origin main
```

## 🧪 Testing & Linting

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

## 📚 Documentation

- **API Documentation**: See `api/README.md` or visit `/docs` endpoint
- **Frontend Documentation**: See `frontend/README.md`

## 🔄 CI/CD Workflows

- **`backend-ci.yml`**: Lint and test backend on every push/PR
- **`backend-deploy.yml`**: Deploy backend to Render on push to main
- **`frontend-ci.yml`**: Lint and test frontend on every push/PR
- **`frontend-deploy.yml`**: Build and deploy frontend to GitHub Pages on push to main