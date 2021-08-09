import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/users';
import jwt from 'jsonwebtoken';
import verifyAuthToken from './general';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
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

const createUserAfterLogin = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };

    const newUser = await store.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const showUser = async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/user/:id', verifyAuthToken, showUser);
  app.post('/user', createUser);
  app.post('/user-after-login', verifyAuthToken, createUserAfterLogin);
};

export default userRoutes;
