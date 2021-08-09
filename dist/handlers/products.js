"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const general_1 = __importDefault(require("./general"));
const store = new products_1.ProductStore();
const index = async (_req, res) => {
    const users = await store.index();
    res.json(users);
};
const showProduct = async (req, res) => {
    try {
        const newProduct = await store.show(req.body.id);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const createProduct = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category_id: req.body.category_id,
        };
        const newProduct = await store.create(product);
        return res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/product/:id', showProduct);
    app.post('/product', general_1.default, createProduct);
};
exports.default = productRoutes;
