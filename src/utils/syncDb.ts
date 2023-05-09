import { initDb } from './db';
import Product from '../models/Product';

const syncDb = async () => {
  console.log('START');

  initDb();

  await Product.sync({ alter: true });

  console.log('Tables succesfully synchonized');
};

syncDb();
