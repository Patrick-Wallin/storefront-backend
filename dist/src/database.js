"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _b = process.env, POSTGRES_HOST = _b.POSTGRES_HOST, POSTGRES_DB = _b.POSTGRES_DB, POSTGRES_USER = _b.POSTGRES_USER, POSTGRES_PASSWORD = _b.POSTGRES_PASSWORD, POSTGRES_TEST_DB = _b.POSTGRES_TEST_DB, ENV = _b.ENV, BCRYPT_PASSWORD = _b.BCRYPT_PASSWORD, SALT_ROUNDS = _b.SALT_ROUNDS, TOKEN_SECRET = _b.TOKEN_SECRET, ACTIVE_ORDER = _b.ACTIVE_ORDER, COMPLETED_ORDER = _b.COMPLETED_ORDER;
// Reduced line of codes and easier to read
/*
let client: Pool = new Pool();

if (process.env.ENV?.trim() === 'dev') {
  client = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });
}

if (process.env.ENV?.trim() === 'test') {
  client = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_TEST_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });
}
*/
var client = new pg_1.Pool({
    host: process.env.POSTGRES_HOST,
    database: ((_a = process.env.ENV) === null || _a === void 0 ? void 0 : _a.trim()) === 'dev'
        ? process.env.POSTGRES_DB
        : process.env.POSTGRES_TEST_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
});
exports.default = client;
