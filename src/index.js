import 'dotenv/config'
import app from './app.js'
import { PORT } from './config.js'

const server = app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})

server.on('error', (error) => {
  console.error('Error starting th server:', error)
})