const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)
// const PORT = 3003
// const PORT  = process.env.PORT
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

const PORT  = process.env.PORT
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})