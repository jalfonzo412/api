import express from 'express';
import animalsRoutes from './routes/animals.routes.js';
import indexRoutes from './routes/index.routes.js';

const app = express();

app.use(indexRoutes)
app.use(animalsRoutes)

app.listen(9000);
console.log('Server running on port 9000');