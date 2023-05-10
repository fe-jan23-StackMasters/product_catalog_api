import Product from '../models/Product';
import shuffle from 'lodash.shuffle';
import {
  calculateSale,
  getNameWithoutColorAndMemo,
  sortByCategory,
} from '../helpers/helpers';
import { Category } from '../types/Category';
import { SortBy } from '../types/SortBy';

const normalize = (products: Product[]) => {
  return products.map((product) => ({
    id: product.id,
    category: product.category,
    phoneId: product.phoneId,
    itemId: product.itemId,
    name: product.name,
    fullPrice: product.fullPrice,
    price: product.price,
    screen: product.screen,
    capacity: product.capacity,
    color: product.color,
    ram: product.ram,
    year: product.year,
    image: product.image,
  }));
};

const getAll = async () => {
  const allProducts = await Product.findAll({
  });

  return allProducts;
};

const getWithParams = async (
  page: number,
  perPage: number,
  category: Category,
  sortBy: SortBy,
) => {
  const limit = perPage;
  const offset = page ? (page - 1) * limit : 0;

  const products = await Product.findAll({
    where: {
      category,
    },
    offset,
    limit,
  });

  console.log(category);

  return sortByCategory(products, sortBy);
};

const getNew = async () => {
  const products = await Product.findAll({
    order: [['year', 'DESC']],
    limit: 12,
  });

  return products;
};

const getHot = async () => {
  const products = await getAll();

  return products
    .sort((a, b) => calculateSale(b) - calculateSale(a))
    .slice(0, 12);
};

const getRecommendations = async (id: string) => {
  const products = await getAll();
  const currentName = getNameWithoutColorAndMemo(id);

  const productsWithoutCurrent = products.filter(product => (
    getNameWithoutColorAndMemo(product.itemId) !== currentName
  ));

  return shuffle(productsWithoutCurrent);
};

export default {
  getAll, getWithParams, normalize, getNew, getHot, getRecommendations,
};
