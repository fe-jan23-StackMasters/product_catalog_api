import express from 'express';
import { initDb } from './utils/db';
import fs from 'fs';
import { Product } from './types/Product';

const PORT = 3000;
const app = express();
const sequelize = initDb();

const products: Product[] = JSON.parse(
  fs.readFileSync('src/data/products.json', 'utf-8'),
);

app.use(express.static('dist/public'));

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

app.get('/products', (req, res) => {
  res.send(products);
});

app.get('/products/hot', (req, res) => {
  const sortedProducts = [...products].sort((a, b) => {
    const calculateSale = (fullPrice: number, salePrice: number) => {
      return (fullPrice - salePrice) / fullPrice * 100;
    };

    return calculateSale(b.fullPrice, b.price)
    - calculateSale(a.fullPrice, a.price);
  });

  res.send(sortedProducts);
});

app.get('/products/new', (req, res) => {
  const sortedProducts = [...products].sort((a, b) => {
    return b.year - a.year;
  });

  res.send(sortedProducts);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
