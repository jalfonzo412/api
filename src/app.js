import express from 'express';
import cors from 'cors';
import router from './routes/index.routes.js';
import AnimalsRouter from './routes/animals.routes.js';
import { swaggerDocs } from './swagger.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use('/api', AnimalsRouter);

swaggerDocs(app);

app.use((req, res, next) =>{
  res.status(404).json({
    message: 'Endpoint not found'
  });
});

app.use((err, req, res, next) =>{
  console.log(err);
  res.status(err.status || 500).json({
    message: 'Something goes wrong'
  });
});

export default app;