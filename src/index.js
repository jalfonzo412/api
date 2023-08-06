import express from 'express';
import animalsRoutes from './routes/animals.routes.js';
import indexRoutes from './routes/index.routes.js';

const app = express();

app.use(express.json())

app.use(indexRoutes)
app.use('/api', animalsRoutes)

app.listen(9000);
console.log('Server running on port 9000');