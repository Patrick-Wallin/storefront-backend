"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const general_1 = __importDefault(require("./general"));
const store = new users_1.UserStore();
const index = async (_req, res) => {
    const users = await store.index();
    res.json(users);
};
const createUser = async (req, res) => {
    try {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        const newUser = await store.create(user);
        var token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const showUser = async (req, res) => {
    try {
        const newUser = await store.show(req.body.id);
        var token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const userRoutes = (app) => {
    app.get('/users', index);
    app.get('/user/:id', general_1.default, showUser);
    app.post('/user', createUser);
};
exports.default = userRoutes;
