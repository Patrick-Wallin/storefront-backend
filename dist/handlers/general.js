"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
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
exports.default = verifyAuthToken;
