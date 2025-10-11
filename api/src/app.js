const express = require('express')
const swaggerUi = require('swagger-ui-express')
const cors = require('cors')

const config = require('./config')
const swaggerSpec = require('./docs/swagger')
const fileRoutes = require('./routes/fileRoutes')
const errorHandler = require('./middlewares/errorHandler')
const requestLogger = require('./middlewares/requestLogger')
const rateLimiter = require('./middlewares/rateLimiter')
const requestDebounce = require('./middlewares/requestDebounce')

const app = express()

app.use(requestLogger)

app.use(cors())

app.use(express.json())

if (config.rateLimit.enabled) {
  app.use(rateLimiter)
}

app.use(requestDebounce)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }))

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/files', fileRoutes)

app.use(errorHandler)

module.exports = app
