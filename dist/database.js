"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_TEST_DB, ENV, BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET, ACTIVE_ORDER, COMPLETED_ORDER, } = process.env;
let client = new pg_1.Pool();
if (process.env.ENV?.trim() === 'dev') {
    client = new pg_1.Pool({
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
    });
}
if (process.env.ENV?.trim() === 'test') {
    client = new pg_1.Pool({
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_TEST_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
    });
}
exports.default = client;
