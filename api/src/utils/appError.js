/**
 * Represents an operational error that can be safely returned to API consumers.
 */
class AppError extends Error {
  /**
   * @param {string} message - Human-readable error message.
   * @param {number} [statusCode=500] - HTTP status code associated with the error.
   * @param {object} [options] - Additional error options.
   * @param {boolean} [options.isOperational=true] - Flag indicating if the error is operational.
   * @param {object} [options.details] - Extra metadata to help debugging.
   */
  constructor (message, statusCode = 500, options = {}) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
    this.isOperational = options.isOperational !== false
    if (options.details) {
      this.details = options.details
    }
    Error.captureStackTrace(this, AppError)
  }
}

module.exports = AppError
