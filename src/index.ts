// import express, { Response, Request } from 'express';
import express from 'express';
import cors from 'cors';
import { initDb } from './utils/db';
import productRouter from './routers/productRouter';
import imageRouter from './routers/imageRouter';

// app.use((err: Error, req: Request, res: Response) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

import fs from 'fs';

const PORT = 4152;
const app = express();

export const sequelize = initDb();

app.use(cors());
app.use(express.static('public'));
app.use('/products', express.json(), productRouter);
app.use('/images', express.json(), imageRouter);

app.get('/files', (req, res) => {
  const directoryPath = 'public/img';

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    res.send(files);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
