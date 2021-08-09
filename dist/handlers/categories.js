"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categories_1 = require("../models/categories");
const store = new categories_1.CategoryStore();
const index = async (_req, res) => {
    const categories = await store.index();
    res.json(categories);
};
const showCategory = async (req, res) => {
    try {
        const category = await store.show(req.body.id);
        res.json(category);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const categoryRoutes = (app) => {
    app.get('/categories', index);
    app.get('/category/:id', showCategory);
};
exports.default = categoryRoutes;
