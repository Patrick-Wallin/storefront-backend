"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var categories_1 = __importDefault(require("./handlers/categories"));
var orders_1 = __importDefault(require("./handlers/orders"));
var app = express_1.default();
var address = '0.0.0.0:3000';
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
users_1.default(app);
products_1.default(app);
categories_1.default(app);
orders_1.default(app);
exports.default = app;
/*
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
*/
