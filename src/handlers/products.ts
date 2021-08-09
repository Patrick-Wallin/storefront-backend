import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/products';
import jwt from 'jsonwebtoken';
import verifyAuthToken from './general';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const showProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await store.show(parseInt(req.params.id));
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category_id,
    };

    const newProduct = await store.create(product);
    return res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const showTopFivePopular = async (_req: Request, res: Response) => {
  const products = await store.showTopFivePopular();
  res.json(products);
};

const showByCategory = async (req: Request, res: Response) => {
  try {
    const productBasedOnCategoryRecords = await store.showByCategory(
      parseInt(req.params.categoryid)
    );
    res.json(productBasedOnCategoryRecords);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/product/:id', showProduct);
  app.post('/product', verifyAuthToken, createProduct);
  app.get('/top-five-popular-products', showTopFivePopular);
  app.get('/product-category/:categoryid', showByCategory);
};

export default productRoutes;
