"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryStore = void 0;
const database_1 = __importDefault(require("../database"));
class CategoryStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM categories';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get categories. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM categories WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find category ${id}. Error: ${err}`);
        }
    }
}
exports.CategoryStore = CategoryStore;
