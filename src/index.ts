// import express, { Response, Request } from 'express';
import express from 'express';
import cors from 'cors';
import { initDb } from './utils/db';
import productRouter from './routers/productRouter';

const PORT = 3000;
const app = express();

export const sequelize = initDb();

app.use(cors());
app.use(express.static('public'));
app.use('/products', express.json(), productRouter);

// app.use((err: Error, req: Request, res: Response) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
