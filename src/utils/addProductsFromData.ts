import fs from 'fs';
import { watches } from './data/watches';
import { Product } from '../types/Product';
import { products } from './data/products';
import { tablets } from './data/tablets';
import { phones } from './data/phones';

const getYear = (id: string): number => {
  switch (true) {
    case (id.includes('-series-3-')):
      return 2017;
    case (id.includes('-series-4-')):
      return 2019;
    case (id.includes('-series-5-')):
    case (id.includes('-mini-5th-gen-')):
      return 2019;
    case (id.includes('-series-6-')):
    case (id.includes('-air-4th-gen-')):
    case (id.includes('-se-')):
    case (id.includes('-2020-')):
    case (id.includes('iphone-12')):
      return 2020;
    case (id.includes('-2021-')):
    case (id.includes('iphone-13')):
    case (id.includes('-mini-6th-gen-')):
      return 2021;
    case (id.includes('iphone-14')):
      return 2022;
    default:
      return 2023;
  }
};

const countMaxId = () => {
  return [...products].sort((a, b) => +b.id - +a.id)[0].id;
};

let maxId = countMaxId();

const getWatches = () => {
  const newObjects: Product[] = [];

  watches.map(watch => {
    const newObject: Product = {
      id: String(+maxId + 1),
      category: 'watches', // dont forget to change this if you need
      phoneId: watch.id,
      itemId: watch.id,
      name: watch.name,
      fullPrice: watch.priceRegular,
      price: watch.priceDiscount,
      screen: watch.screen,
      capacity: watch.capacity,
      color: watch.color,
      ram: watch.ram,
      year: getYear(watch.id),
      image: watch.images[0],
    };

    maxId = String(+maxId + 1);
    newObjects.push(newObject);
  });

  return newObjects;
};

const getTablets = () => {
  const newObjects: Product[] = [];

  tablets.map(tablet => {
    const newObject: Product = {
      id: String(+maxId + 1),
      category: 'tablets',
      phoneId: tablet.id,
      itemId: tablet.id,
      name: tablet.name,
      fullPrice: tablet.priceRegular,
      price: tablet.priceDiscount,
      screen: tablet.screen,
      capacity: tablet.capacity,
      color: tablet.color,
      ram: tablet.ram,
      year: getYear(tablet.id),
      image: tablet.images[0],
    };

    maxId = String(+maxId + 1);
    newObjects.push(newObject);
  });

  return newObjects;
};

const getPhones = () => {
  const newObjects: Product[] = [];

  phones.map(phone => {
    const newObject: Product = {
      id: String(+maxId + 1),
      category: 'phones',
      phoneId: phone.id,
      itemId: phone.id,
      name: phone.name,
      fullPrice: phone.priceRegular,
      price: phone.priceDiscount,
      screen: phone.screen,
      capacity: phone.capacity,
      color: phone.color,
      ram: phone.ram,
      year: getYear(phone.id),
      image: phone.images[0],
    };

    maxId = String(+maxId + 1);
    newObjects.push(newObject);
  });

  return newObjects;
};

const data = { getTablets, getWatches, getPhones };

fs.writeFileSync(
  'src/utils/data/newData.json',
  JSON.stringify(data.getPhones()),
);
