import express from 'express';
import cors from 'cors';
import router from './routes.js';

const app = express()
const port = 4000

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
  console.log('Servidor corriendo en http://localhost:${PORT}');
})