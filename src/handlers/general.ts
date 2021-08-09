import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const splitAuthorizationHeader = authorizationHeader.split(' ');
      if (splitAuthorizationHeader.length >= 2) {
        const token = splitAuthorizationHeader[1];
        jwt.verify(token, process.env.TOKEN_SECRET!, (err, decoded) => {
          if (err) {
            res.status(401);
            res.send('Authorization is not recognized.');
          } else {
            next();
          }
        });
      } else {
        res.status(401);
        res.send('Authorization is required.');
      }
    } else {
      res.status(401);
      res.send('Authorization is required.');
    }
  } catch (error) {
    res.status(401);
    res.send(error);
  }
};

export default verifyAuthToken;
