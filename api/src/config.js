const parseNumber = (value, fallback) => {
  const parsed = Number.parseInt(value, 10)
  return Number.isNaN(parsed) ? fallback : parsed
}

const defaultRateLimitMax = process.env.NODE_ENV === 'test' ? 0 : 10

const rateLimitWindowMs = parseNumber(process.env.RATE_LIMIT_WINDOW_MS, 60_000)
const rateLimitMax = parseNumber(process.env.RATE_LIMIT_MAX, defaultRateLimitMax)

const config = {
  port: parseNumber(process.env.PORT, 3000),
  echoServer: {
    baseURL: process.env.ECHO_SERVER_BASE_URL || 'https://echo-serv.tbxnet.com/v1/secret',
    token: process.env.ECHO_SERVER_TOKEN || 'aSuperSecretKey',
    timeout: parseNumber(process.env.ECHO_SERVER_TIMEOUT, 5000)
  },
  rateLimit: {
    windowMs: rateLimitWindowMs,
    max: rateLimitMax,
    enabled: rateLimitMax > 0
  },
  debounce: {
    windowMs: parseNumber(process.env.REQUEST_DEBOUNCE_WINDOW_MS, 0)
  },
  logging: {
    format: process.env.HTTP_LOG_FORMAT || 'tiny'
  }
}

module.exports = config
