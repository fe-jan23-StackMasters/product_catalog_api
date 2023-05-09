import express from 'express';
import cors from 'cors';
import { initDb } from './utils/db';
import productRouter from './routers/productRouter';

const PORT = 3000;
const app = express();

// const sequelize = initDb();
initDb();

app.use(cors());
app.use(express.static('dist/public'));
app.use(productRouter);

// app.get('/products/hot', (req, res) => {
//   const sortedProducts = [...products].sort((a, b) => {
//     const calculateSale = (fullPrice: number, salePrice: number) => {
//       return (fullPrice - salePrice) / fullPrice * 100;
//     };

//     return calculateSale(b.fullPrice, b.price)
//     - calculateSale(a.fullPrice, a.price);
//   });

//   res.send(sortedProducts);
// });

// app.get('/products/new', (req, res) => {
//   const sortedProducts = [...products].sort((a, b) => {
//     return b.year - a.year;
//   });

//   res.send(sortedProducts);
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
