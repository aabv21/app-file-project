const rateLimit = require('express-rate-limit')
const config = require('../config')

const rateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      code: 429,
      message: 'Too many requests',
      details: null
    })
  }
})

module.exports = rateLimiter
