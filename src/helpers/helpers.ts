import { Order } from 'sequelize';
import Product from '../models/Product';
import { SortBy } from '../types/SortBy';

export const calculateSale = ({ fullPrice, price }: Product) => {
  return ((fullPrice - price) / fullPrice) * 100;
};

export const getNameWithoutColorAndMemo = (id: string): string => {
  return id.split('-').slice(0, -2).join('-');
};

export const filterDuplicateProducts = (products: Product[]): Product[] => {
  const alreadyExists: string[] = [];

  console.log('filtering');
  console.log(products.length);

  const filtered = products.filter((product) => {
    const name = getNameWithoutColorAndMemo(product.itemId);

    if (alreadyExists.includes(name)) {
      return false;
    }

    alreadyExists.push(name);

    return true;
  });

  console.log(filtered.length);

  return filtered;
};

export const getOrderParameter = (sortBy: SortBy): Order => {
  switch (sortBy) {
    case SortBy.HIGHT:
      return [['price', 'DESC']];
    case SortBy.LOW:
      return [['price', 'ASC']];
    case SortBy.NAME:
      return [['name', 'ASC']];
    case SortBy.NEW:
      return [['year', 'DESC']];
    case SortBy.OLD:
      return [['year', 'ASC']];

    default:
      return [['year', 'DESC']];
  }
};
