/**
 * Express global error handling middleware.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = Number.isInteger(err.statusCode) ? err.statusCode : 500

  const defaultMessages = {
    400: 'Bad request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    408: 'Request timeout',
    429: 'Too many requests',
    500: 'Internal server error',
    502: 'Bad gateway',
    503: 'Service unavailable',
    504: 'Gateway timeout'
  }

  const message = err.message || defaultMessages[statusCode] || defaultMessages[500]

  const payload = {
    code: statusCode,
    message,
    details: err.details || null
  }

  res.status(statusCode).json(payload)
}

module.exports = errorHandler
