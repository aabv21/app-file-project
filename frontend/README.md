# File Data Explorer Frontend

React 19 single-page application with Redux Toolkit, React Router, and React-Bootstrap. Deployed automatically to GitHub Pages.

## 🚀 Live Demo

**Production**: https://aabv21.github.io/app-file-project/

## 📋 Requirements

- Node.js 18+
- npm 10+
- Docker (optional, for containerized development)

## 🛠️ Local Development

### Option 1: Standalone (Recommended for development)

```bash
# Ensure backend is running (see api/README.md or use Docker)
docker compose up api

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be available at `http://localhost:5173`

### Option 2: Docker

```bash
# From repository root
docker compose up frontend

# Or run everything
docker compose up --build
```

The app will be available at `http://localhost:5173`

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (uses `.env` file) |
| `npm run dev:docker` | Start dev server in Docker (uses env vars) |
| `npm run build` | Build for production |
| `npm run build:local` | Build locally with `.env` file |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests with Jest |
| `npm run test:watch` | Run tests in watch mode |

## 🔧 Environment Variables

The frontend uses environment variables prefixed with `VITE_` (exposed by Vite at build time).

### Local Development

Copy `.env.example` to `.env` in the repository root (if not already done):

```bash
cp ../.env.example ../.env
```

See `.env.example` for configuration options.

### Production (GitHub Pages)

Set `VITE_API_BASE_URL` as a GitHub Actions secret with the production API URL.

## 🏗️ Architecture

### Key Components

- **`src/App.jsx`**: Main application component
- **`src/router/AppRouter.jsx`**: React Router configuration with GitHub Pages basename support
- **`src/pages/HomePage.jsx`**: Main page with file filter and table
- **`src/components/FileFilter.jsx`**: Dropdown to select files
- **`src/components/FileTable.jsx`**: Responsive table with CSV data
- **`src/hooks/useFilesData.js`**: Custom hook for data fetching and state management

### State Management

Uses Redux Toolkit with the following slices:
- **`filesSlice`**: Manages file list, selected file, and CSV data

### API Integration

- **`src/services/apiClient.js`**: Axios instance with base URL configuration
- **`src/services/filesService.js`**: API methods for fetching files

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm test -- --coverage
```

## 🚢 Deployment

### Automatic Deployment

The frontend deploys automatically to GitHub Pages when changes are pushed to `main`.

**Workflow**: `.github/workflows/frontend-deploy.yml`

### Manual Deployment

```bash
# Trigger deployment via GitHub CLI
gh workflow run frontend-deploy.yml
```

### Build Configuration

- **Base URL**: `/app-file-project/` (configured in `vite.config.js`)
- **Router basename**: Automatically set from `import.meta.env.BASE_URL`
- **API URL**: Injected at build time from `VITE_API_BASE_URL` secret

## 📦 Dependencies

### Core
- React 19
- Redux Toolkit
- React Router DOM
- Axios

### UI
- React Bootstrap
- Bootstrap 5

### Development
- Vite
- ESLint
- Jest & Testing Library
- dotenv-cli

## 🐛 Troubleshooting

### "Cannot connect to API"

1. Verify backend is running: `curl http://localhost:3000/health`
2. Check `VITE_API_BASE_URL` in `.env` file
3. Ensure CORS is enabled in backend

### "Page not found on GitHub Pages"

1. Verify `basename` is set correctly in `AppRouter.jsx`
2. Check that `base` in `vite.config.js` matches repository name
3. Ensure GitHub Pages is enabled in repository settings

### "Environment variables not working"

1. Restart dev server after changing `.env`
2. Verify variables start with `VITE_` prefix
3. In Docker, use `docker compose up --build` to rebuild
