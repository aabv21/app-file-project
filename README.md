# App File Project

Monorepo containing the Node.js API (`api/`) and the React single-page application (`frontend/`). Each service ships with its own README that describes setup, scripts, and environment variables in detail.

## Quick start

```bash
cp .env.example .env
docker compose up --build
# Stop containers when you are done
docker compose down --volumes --remove-orphans
```

- API instructions: `api/README.md`
- Frontend instructions: `frontend/README.md`

## Repository layout

- **`api/`** – Express service with StandardJS, Mocha/Chai, and Swagger documentation (Node 18 runtime).
- **`frontend/`** – React 19 app using Redux Toolkit, Vite, and Testing Library (Node 18 runtime).
- **`docker-compose.yml`** – Boots both services for local development.
- **`.github/workflows/`** – CI pipelines for linting and tests.

Refer to the service-specific READMEs for detailed commands and how the shared `.env` file is consumed locally and in CI.

## Tooling highlights

- **Backend**: `npm run lint` (StandardJS) and `npm run format` (Prettier) inside `api/`
- **Frontend**: `npm run lint` (ESLint) inside `frontend/`

## Continuous integration

GitHub Actions workflows run on every push and pull request to lint and test both services.
- **Backend CI**: `.github/workflows/backend-ci.yml` runs `npm ci`, `npm run lint`, and `npm test` inside `api/` using Node 18.
- **Frontend CI**: `.github/workflows/frontend-ci.yml` runs `npm ci`, `npm run lint`, `npm run test -- --runInBand`, and `npm run build` inside `frontend/` using Node 18.