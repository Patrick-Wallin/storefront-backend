import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
  try {
    const authorizationHeader = req.headers.authorization!;
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);

    next();
  } catch (error) {
    res.status(401);
  }
};

/*
const verifyAuthTokenByID = (req: Request, res: Response, next: Function) => {
    try {
        const authorizationHeader = req.headers.authorization!;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
       // if(decoded.id !== req.body.id) {
         //   throw new Error('User id does not match!')
        //}
        next();
    } catch (error) {
        res.status(401);
    }
}
*/

export default verifyAuthToken;
