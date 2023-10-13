import path from 'path'
import { fileURLToPath } from'url'
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: 'Ani-mania API Documentation',
      description: 'API Documentation for connection with users',
      version: process.env.API_VERSION
    }
  },
  servers: [
    {
      url: `${process.env.API_HOST}:${process.env.API_PORT}`,
      description: 'Ani-mania API'
    }
  ],
  apis: [`${path.join(__dirname, './routes/*.js')}`]
}

const swaggerSpec = swaggerJsDoc(options)

export const swaggerDocs = (app) => {
  app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
  app.get('/api/docs.json', (req, res) =>{
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}