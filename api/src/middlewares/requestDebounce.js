const config = require('../config')

const requestTimestamps = new Map()

const requestDebounce = (req, res, next) => {
  const key = `${req.ip}:${req.originalUrl}`
  const now = Date.now()
  const lastRequest = requestTimestamps.get(key) || 0

  if (now - lastRequest < config.debounce.windowMs) {
    return res.status(429).json({
      code: 429,
      message: 'Too many rapid requests',
      details: null
    })
  }

  requestTimestamps.set(key, now)

  return next()
}

module.exports = requestDebounce
