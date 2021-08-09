"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _c = process.env, POSTGRES_HOST = _c.POSTGRES_HOST, POSTGRES_DB = _c.POSTGRES_DB, POSTGRES_USER = _c.POSTGRES_USER, POSTGRES_PASSWORD = _c.POSTGRES_PASSWORD, POSTGRES_TEST_DB = _c.POSTGRES_TEST_DB, ENV = _c.ENV, BCRYPT_PASSWORD = _c.BCRYPT_PASSWORD, SALT_ROUNDS = _c.SALT_ROUNDS, TOKEN_SECRET = _c.TOKEN_SECRET, ACTIVE_ORDER = _c.ACTIVE_ORDER, COMPLETED_ORDER = _c.COMPLETED_ORDER;
var client = new pg_1.Pool();
if (((_a = process.env.ENV) === null || _a === void 0 ? void 0 : _a.trim()) === 'dev') {
    client = new pg_1.Pool({
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
    });
}
if (((_b = process.env.ENV) === null || _b === void 0 ? void 0 : _b.trim()) === 'test') {
    client = new pg_1.Pool({
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_TEST_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
    });
}
exports.default = client;
