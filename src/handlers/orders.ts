import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/orders';
import { OrderProducts, OrderProductsStore } from '../models/order_products';
import jwt from 'jsonwebtoken';
import verifyAuthToken from './general';

const store = new OrderStore();
const orderProductsStore = new OrderProductsStore();

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
    /*
    const order: Order = {
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      user_id: req.body.user_id,
      status: req.body.status,
    };
    */
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
    };

    const newOrder = await store.create(order);

    const products = req.body.products;
    for (let val of products) {
      const newOrderProduct: OrderProducts = {
        order_id: newOrder,
        product_id: val.product_id,
        quantity: val.quantity,
      };
      const newOrderProductId = await orderProductsStore.create(
        newOrderProduct
      );
    }

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
