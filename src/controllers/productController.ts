import { Request, Response } from 'express';
import productService from '../services/productService';
import phoneService from '../services/phoneService';
import tabletService from '../services/tabletService';
import watchService from '../services/watchService';
import { SortBy } from '../types/SortBy';
import { Category } from '../types/Category';
import Tablet from '../models/Tablet';
import Watch from '../models/Watch';
import Phone from '../models/Phone';

const getAll = async (req: Request, res: Response) => {
  const products = await productService.getAll();

  res.send(productService.normalize(products));
};

const getOnPage = async (req: Request, res: Response) => {
  const {
    perPage = 16,
    page = 1,
    productType = Object.values(Category),
    sortBy = SortBy.NEW,
    priceMin = 0,
    priceMax = 1000000,
  } = req.query;

  if (Array.isArray(perPage) || Array.isArray(page) || Array.isArray(sortBy)) {
    res.sendStatus(400);

    return;
  }

  const products = await productService.getWithParams(
    +page,
    +perPage,
    productType as Category[],
    sortBy as SortBy,
    +priceMin,
    +priceMax,
  );

  const models = await productService.getModelsNumber(
    productType as Category[],
    +priceMin,
    +priceMax,
  );

  res.send({
    models,
    pages: Math.ceil(models / +perPage),
    products: productService.normalize(products || []),
  });
};

const getNew = async (req: Request, res: Response) => {
  const { limit = 12 } = req.query;

  const products = await productService.getNew(+limit);

  res.send(productService.normalize(products));
};

const getHot = async (req: Request, res: Response) => {
  const { limit = 12 } = req.query;
  const products = await productService.getHot(+limit);

  res.send(productService.normalize(products));
};

const getOne = async (req: Request, res: Response) => {
  const { productId } = req.params;

  if (!productId) {
    res.sendStatus(400);

    return;
  }

  let product: Phone | Tablet | Watch | null = await phoneService.getOne(
    productId,
  );

  if (!product) {
    product = await tabletService.getOne(productId);
  }

  if (!product) {
    product = await watchService.getOne(productId);
  }

  if (!product) {
    res.sendStatus(404);

    return;
  }

  res.send(product);
};

const getRecommended = async (req: Request, res: Response) => {
  const { productId } = req.params;

  if (!productId) {
    res.sendStatus(400);

    return;
  }

  let product: Phone | Tablet | Watch | null = await phoneService.getOne(
    productId,
  );

  if (!product) {
    product = await tabletService.getOne(productId);
  }

  if (!product) {
    product = await watchService.getOne(productId);
  }

  if (!product) {
    res.sendStatus(404);

    return;
  }

  const recommendations = await productService.getRecommended();

  res.send(productService.normalize(recommendations));
};

const getMinMax = async (req: Request, res: Response) => {
  const { category } = req.query;

  let prices: number[] = [];

  switch (category) {
    case Category.PHONE:
      prices = await phoneService.getMinMax();
      break;
    case Category.TABLET:
      prices = await tabletService.getMinMax();
      break;
    case Category.ACCESSORIES:
      prices = await watchService.getMinMax();
      break;
    default:
      res.status(400).send('No category found');

      return;
  }

  res.send(prices);
};

export default {
  getAll,
  getOnPage,
  getNew,
  getHot,
  getOne,
  getRecommended,
  getMinMax,
};
