import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/users';
import jwt from 'jsonwebtoken';
import verifyIdToken from './general';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };

    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET!);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const showUser = async (req: Request, res: Response) => {
  try {
    const newUser = await store.show(req.body.id);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET!);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/user/:id', verifyIdToken, showUser);
  app.post('/user', createUser);
};

export default userRoutes;
