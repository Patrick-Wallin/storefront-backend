import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/orders';
import jwt from 'jsonwebtoken';
import verifyAuthToken from './general';

const store = new OrderStore();

const showActiveOrdersByUser = async (req: Request, res: Response) => {
  try {
    const orders = await store.showActiveOrdersByUser(
      parseInt(req.params.userid)
    );
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const showCompletedOrdersByUser = async (req: Request, res: Response) => {
  try {
    const orders = await store.showCompletedOrdersByUser(
      parseInt(req.params.userid)
    );
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      user_id: req.body.user_id,
      status: req.body.status,
    };

    const newOrder = await store.create(order);
    return res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.post('/order', createOrder);
  app.get('/orders/:userid', verifyAuthToken, showActiveOrdersByUser);
  app.get(
    '/completed-orders/:userid',
    verifyAuthToken,
    showCompletedOrdersByUser
  );
};

export default orderRoutes;
