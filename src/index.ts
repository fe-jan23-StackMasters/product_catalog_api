import express from 'express';
import { initDb } from './initDb.js';

const PORT = 3000;
const app = express();
const sequelize = initDb();

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
