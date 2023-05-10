import { Request, Response } from 'express';
import productService from '../services/productService';
import phoneService from '../services/phoneService';
import { SortBy } from '../types/SortBy';
import { Category } from '../types/Category';

const getAll = async (req: Request, res: Response) => {
  const products = await productService.getAll();

  res.send(productService.normalize(products));
};

const getOnPage = async (req: Request, res: Response) => {
  const {
    perPage = 16,
    page = 1,
    productType = Category.PHONE,
    sortBy = SortBy.NEW,
  } = req.query;

  if (
    Array.isArray(perPage)
    || Array.isArray(page)
    || Array.isArray(productType)
    || Array.isArray(sortBy)
  ) {
    res.sendStatus(400);

    return;
  }

  const products = await productService.getWithParams(
    +page,
    +perPage,
    productType as Category,
    sortBy as SortBy,
  );

  res.send(productService.normalize(products || []));
};

const getNew = async (req: Request, res: Response) => {
  const products = await productService.getNew();

  res.send(productService.normalize(products));
};

const getHot = async (req: Request, res: Response) => {
  const products = await productService.getHot();

  res.send(productService.normalize(products));
};

const getOne = async (req: Request, res: Response) => {
  const { productId } = req.params;

  if (!productId) {
    res.sendStatus(400);

    return;
  }

  const product = await phoneService.getOne(productId);

  if (!product) {
    res.sendStatus(404);

    return;
  }

  res.send(product);
};

const getRecommendations = async (req: Request, res: Response) => {
  const { productId } = req.params;

  if (!productId) {
    res.sendStatus(503);

    return;
  }

  const product = await phoneService.getOne(productId);

  if (!product) {
    res.sendStatus(404);

    return;
  }

  const recommendations = await productService.getRecommendations(
    product?.id || '',
  );

  res.send(productService.normalize(recommendations));
};

export default {
  getAll,
  getOnPage,
  getNew,
  getHot,
  getOne,
  getRecommendations,
};
