import Product from '../models/Product';
import { SortBy } from '../types/SortBy';

export const calculateSale = ({ fullPrice, price }: Product) => {
  return ((fullPrice - price) / fullPrice) * 100;
};

export const getNameWithoutColorAndMemo = (id: string): string => {
  return id.split('-').slice(0, -2).join('-');
};

export const sortByCategory = (products: Product[], sortBy: SortBy) => {
  switch (sortBy) {
    case SortBy.HIGHT:
      return [...products].sort((a, b) => b.price - a.price);
    case SortBy.LOW:
      return [...products].sort((a, b) => a.price - b.price);
    case SortBy.NAME:
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case SortBy.NEW:
      return [...products].sort((a, b) => b.year - a.year);
    case SortBy.OLD:
      return [...products].sort((a, b) => a.year - b.year);

    default:
      break;
  }
};
