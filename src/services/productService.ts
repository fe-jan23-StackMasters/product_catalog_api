import Product from '../models/Product';
import {
  calculateSale,
  // filterDuplicatePhones,
  sortByCategory,
} from '../helpers/helpers';
import { Category } from '../types/Category';
import { SortBy } from '../types/SortBy';
import { Op, Sequelize } from 'sequelize';

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
  const allProducts = await Product.findAll({});

  return allProducts;
};

const getWithParams = async (
  page: number,
  perPage: number,
  category: Category[] | Category,
  sortBy: SortBy,
) => {
  let productType = category;

  if (!Array.isArray(category)) {
    productType = [category];
  }

  const limit = perPage;
  const offset = page ? (page - 1) * limit : 0;

  const products = await Product.findAll({
    where: {
      category: {
        [Op.in]: productType,
      },
    },
    offset,
    limit,
  });

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

  // const productsWithoutDuplicates = filterDuplicatePhones(products);
  // we have only 9 phones without duplicates

  return products
    .sort((a, b) => calculateSale(b) - calculateSale(a))
    .slice(0, 12);
};

const getRecommendations = async () => {
  const products = await Product.findAll({
    order: Sequelize.literal('random()'),
    limit: 12,
  });

  // const productsWithoutDuplicates = filterDuplicatePhones(products);
  // we have only 9 phones without duplicates

  return products;
};

export default {
  getAll,
  getWithParams,
  normalize,
  getNew,
  getHot,
  getRecommendations,
};
