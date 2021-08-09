import express, { Request, Response } from 'express';
import { Category, CategoryStore } from '../models/categories';
import jwt from 'jsonwebtoken';
import verifyIdToken from './general';

const store = new CategoryStore();

const index = async (_req: Request, res: Response) => {
  const categories = await store.index();
  res.json(categories);
};

const showCategory = async (req: Request, res: Response) => {
  try {
    const category = await store.show(parseInt(req.params.id));
    res.json(category);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const categoryRoutes = (app: express.Application) => {
  app.get('/categories', index);
  app.get('/category/:id', showCategory);
};

export default categoryRoutes;
