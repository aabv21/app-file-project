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
