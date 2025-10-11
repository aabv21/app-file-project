const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const app = require('./app')
const config = require('./config')

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`API running on http://localhost:${config.port}`)
})
