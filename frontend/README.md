# File Data Explorer Frontend

React 19 single-page application built with Redux Toolkit and React-Bootstrap. It consumes the internal API to fetch the file list and display normalized CSV content.

## Requirements

- Node.js 18+
- npm 10+

## Installation & running

```bash
cp ../.env.example ../.env   # if you have not created it yet
npm install
npm run dev
```

The dev server reads environment values from the root `.env` file through `dotenv-cli`. The app runs on `http://localhost:5173` by default.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run test`

## Environment variables

Define frontend settings inside the repository root `.env` file (variables beginning with `VITE_` are exposed by Vite).

- `VITE_API_BASE_URL`

## Notable modules

- `src/hooks/useFilesData.js` orchestrates Redux state and API calls.
- `src/components/FileFilter.jsx` renders the file selector.
- `src/components/FileTable.jsx` displays the responsive table with tooltips.

## Testing

```bash
npm run test
```
