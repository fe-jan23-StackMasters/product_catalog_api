import { initDb } from './db';
import Product from '../models/Product';
import Phone from '../models/Phone';
import Tablet from '../models/Tablet';
import Watch from '../models/Watch';
import { phones } from './data/phones';
import { products } from './data/products';
import { tablets } from './data/tablets';
import { watches } from './data/watches';

const syncDb = async () => {
  console.log('START');

  initDb();

  await Product.sync({ alter: true }).catch((error) =>
    console.log(error.message));

  Promise.all(products.map((product) => Product.create(product as any)))
    .then(() => console.log('Success'))
    .catch((error) => console.log(error.message));

  await Phone.sync({ alter: true }).catch((error) =>
    console.log(error.message));

  Promise.all(phones.map((phone) => Phone.create(phone as any)))
    .then(() => console.log('Success'))
    .catch((error) => console.log(error.message));

  await Tablet.sync({ alter: true }).catch((error) =>
    console.log(error.message));

  Promise.all(tablets.map((tablet) => Tablet.create(tablet as any)))
    .then(() => console.log('Success'))
    .catch((error) => console.error(error.message));

  await Watch.sync({ alter: true }).catch((error) =>
    console.log(error.message));

  Promise.all(watches.map((watch) => Watch.create(watch as any)))
    .then(() => console.log('Success'))
    .catch((error) => console.error(error.message));

  console.log('Tables succesfully synchonized');
};

syncDb();
