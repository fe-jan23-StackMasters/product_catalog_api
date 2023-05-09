import Product from '../models/Product';

const normalize = (products: Product[]) => {
  return products.map(product => ({
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

const getAll = async() => {
  const allProducts = await Product.findAll({
    // order: [
    //   ['createdAt', 'ASC'],
    // ],
  });

  return allProducts;
};

const getWithParams = async(page = 1, perPage = 16) => {
  const limit = perPage;
  const offset = page ? (page - 1) * limit : 0;

  const products = await Product.findAll({
    offset,
    limit,
  });

  return products;
};

export default { getAll, getWithParams, normalize };
