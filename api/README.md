# File Data API

Express service that proxies the external echo CSV API, normalizes responses, and serves data to the React frontend.

## Requirements

- Node.js 18+
- npm 10+

## Setup

```bash
cp ../.env.example ../.env   # if you have not created it yet
npm install
npm run dev
```

The server reads configuration from the repository root `.env` file (using `dotenv` in `src/index.js`).
It runs on `http://localhost:3000` by default.

## Available scripts

- `npm run dev` – start the API with nodemon.
- `npm run start` – run the API without hot reload.
- `npm run lint` – StandardJS checks.
- `npm run test` – Mocha/Chai tests.

## Environment variables

Define these keys in the root `.env` file (or supply them through your deployment platform). No fallbacks are shipped.

- `PORT`
- `ECHO_SERVER_BASE_URL`
- `ECHO_SERVER_TOKEN`
- `ECHO_SERVER_TIMEOUT`
- `RATE_LIMIT_WINDOW_MS`
- `RATE_LIMIT_MAX` (`0` disables the limiter)
- `REQUEST_DEBOUNCE_WINDOW_MS`
- `HTTP_LOG_FORMAT`

By default, the provided `.env.example` sets `RATE_LIMIT_MAX=10` with `RATE_LIMIT_WINDOW_MS=60000` (10 requests per minute) and `REQUEST_DEBOUNCE_WINDOW_MS=6000` to prevent rapid bursts from the same IP.

## REST endpoints

- `GET /health`
- `GET /files/list`
- `GET /files/data?fileName=<name>`

For Swagger documentation, start the API and browse to `/docs`.

## 🚢 Deployment

### Production

**Live API**: https://app-file-project-api.onrender.com  
**API Docs**: https://app-file-project-api.onrender.com/docs

The API is deployed automatically to Render when changes are pushed to `main`.

**Workflow**: `.github/workflows/backend-deploy.yml`

### Render Setup

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `api`
   - **Runtime**: Docker
   - **Instance Type**: Free (or higher)
4. Add environment variables in Render dashboard:
   - `PORT=3000`
   - `ECHO_SERVER_BASE_URL`
   - `ECHO_SERVER_TOKEN`
   - `ECHO_SERVER_TIMEOUT`
   - `RATE_LIMIT_WINDOW_MS`
   - `RATE_LIMIT_MAX`
   - `REQUEST_DEBOUNCE_WINDOW_MS`
   - `HTTP_LOG_FORMAT`
5. Copy the Deploy Hook URL from Settings
6. Add as GitHub secret: `RENDER_DEPLOY_HOOK_URL`

### Manual Deployment

Deployments are triggered automatically via GitHub Actions. To deploy manually:

```bash
# Push to main branch
git push origin main

# Or trigger via deploy hook
curl -X POST $RENDER_DEPLOY_HOOK_URL
```

### Docker Deployment

The API uses the `Dockerfile` in this directory for containerized deployment on Render.
