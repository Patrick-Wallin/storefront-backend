"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            var splitAuthorizationHeader = authorizationHeader.split(' ');
            if (splitAuthorizationHeader.length >= 2) {
                var token = splitAuthorizationHeader[1];
                jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
                    if (err) {
                        res.status(401);
                        res.send('Authorization is not recognized.');
                    }
                    else {
                        next();
                    }
                });
            }
            else {
                res.status(401);
                res.send('Authorization is required.');
            }
        }
        else {
            res.status(401);
            res.send('Authorization is required.');
        }
    }
    catch (error) {
        res.status(401);
        res.send(error);
    }
};
exports.default = verifyAuthToken;
