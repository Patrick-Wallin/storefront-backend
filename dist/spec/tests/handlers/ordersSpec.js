"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("../../../src/server"));
var supertest_1 = __importDefault(require("supertest"));
var products_1 = require("../../../src/models/products");
var users_1 = require("../../../src/models/users");
var orders_1 = require("../../../src/models/orders");
var request = supertest_1.default(server_1.default);
var store = new products_1.ProductStore();
var userStore = new users_1.UserStore();
var orderStore = new orders_1.OrderStore();
describe('Testing Products - API', function () {
    var _this = this;
    var name = "Cyberpower PC";
    var price = 1450.75;
    var categoryId = 12;
    var firstName = "Maria";
    var lastName = "Tester";
    var password = "Maria-Tester";
    var quantity = 500;
    var token = '';
    var productId = 0;
    var userId = 0;
    var orderId = new Array();
    beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post('/user').send({ firstname: firstName, lastname: lastName, password: password })];
                case 1:
                    response = _a.sent();
                    token = response.body;
                    return [4 /*yield*/, userStore.getUserIdBasedOnNames(firstName, lastName)];
                case 2:
                    userId = _a.sent();
                    return [4 /*yield*/, request.post('/product').set('Authorization', 'Bearer ' + token).send({ name: name, price: price, category_id: categoryId })];
                case 3:
                    response = _a.sent();
                    productId = response.body;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(_this, void 0, void 0, function () {
        var result, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < orderId.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, orderStore.delete(orderId[i])];
                case 2:
                    result = _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, store.delete(productId)];
                case 5:
                    result = _a.sent();
                    return [4 /*yield*/, userStore.delete(userId)];
                case 6:
                    result = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('respond with get as /orders/${userId} - status 200 (no record)', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/orders/" + userId).set('Authorization', 'Bearer ' + token)];
                case 1:
                    response = _a.sent();
                    expect(response.body.length).toEqual(0);
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('respond with get as /completed-orders/${userId} - status 200 (no record for completed order)', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/completed-orders/" + userId).set('Authorization', 'Bearer ' + token)];
                case 1:
                    response = _a.sent();
                    expect(response.body.length).toEqual(0);
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Create Order with responsing in order id', function () { return __awaiter(_this, void 0, void 0, function () {
        var orderIdFromStore;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderStore.create({
                        product_id: productId,
                        quantity: quantity,
                        user_id: userId,
                        status: parseInt(process.env.ACTIVE_ORDER)
                    })];
                case 1:
                    orderIdFromStore = _a.sent();
                    expect(orderIdFromStore).toBeGreaterThanOrEqual(1);
                    orderId.push(orderIdFromStore);
                    return [2 /*return*/];
            }
        });
    }); });
    it('respond with get as /orders/${userId} - status 200 (one record - active)', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/orders/" + userId).set('Authorization', 'Bearer ' + token)];
                case 1:
                    response = _a.sent();
                    expect(response.body.length).toEqual(1);
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Change order status to complete for ${orderId}', function () { return __awaiter(_this, void 0, void 0, function () {
        var rowsToBeUpdated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderStore.changeOrderToBeCompletedByOrder(orderId[0])];
                case 1:
                    rowsToBeUpdated = _a.sent();
                    expect(rowsToBeUpdated).toBeGreaterThanOrEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('respond with get as /completed-orders/${userId} - status 200 (one record for completed order)', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/completed-orders/" + userId).set('Authorization', 'Bearer ' + token)];
                case 1:
                    response = _a.sent();
                    expect(response.body.length).toEqual(1);
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    // top five popular! 
    it('Show Top Five Popular. get as /top-five-popular-products', function () { return __awaiter(_this, void 0, void 0, function () {
        var orderIdFromStore, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderStore.create({
                        product_id: productId,
                        quantity: 40,
                        user_id: userId,
                        status: parseInt(process.env.ACTIVE_ORDER)
                    })];
                case 1:
                    orderIdFromStore = _a.sent();
                    orderId.push(orderIdFromStore);
                    return [4 /*yield*/, orderStore.create({
                            product_id: productId,
                            quantity: 100,
                            user_id: userId,
                            status: parseInt(process.env.ACTIVE_ORDER)
                        })];
                case 2:
                    orderIdFromStore = _a.sent();
                    orderId.push(orderIdFromStore);
                    return [4 /*yield*/, orderStore.create({
                            product_id: productId,
                            quantity: 1,
                            user_id: userId,
                            status: parseInt(process.env.ACTIVE_ORDER)
                        })];
                case 3:
                    orderIdFromStore = _a.sent();
                    orderId.push(orderIdFromStore);
                    return [4 /*yield*/, orderStore.create({
                            product_id: productId,
                            quantity: 5,
                            user_id: userId,
                            status: parseInt(process.env.ACTIVE_ORDER)
                        })];
                case 4:
                    orderIdFromStore = _a.sent();
                    orderId.push(orderIdFromStore);
                    return [4 /*yield*/, request.get("/top-five-popular-products")];
                case 5:
                    response = _a.sent();
                    expect(response.body).toHaveSize(5);
                    return [2 /*return*/];
            }
        });
    }); });
});
