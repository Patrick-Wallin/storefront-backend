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
Object.defineProperty(exports, "__esModule", { value: true });
var orders_1 = require("../../../src/models/orders");
var users_1 = require("../../../src/models/users");
var products_1 = require("../../../src/models/products");
var store = new orders_1.OrderStore();
var userStore = new users_1.UserStore();
var productStore = new products_1.ProductStore();
describe("Order Model", function () {
    var firstName = "Patrick";
    var lastName = "Wallin";
    var productName = "Bill Gates PC";
    var productPrice = 100.00;
    var categoryId = 12;
    var orderQuantity = 5;
    var userId = 0;
    var productId = 0;
    var orderId = 0;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userStore.create({
                        firstname: firstName,
                        lastname: lastName
                    })];
                case 1:
                    result = _a.sent();
                    userId = result.id;
                    product = {
                        name: productName,
                        price: productPrice,
                        category_id: categoryId
                    };
                    return [4 /*yield*/, productStore.create(product)];
                case 2:
                    productId = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, result, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(orderId != undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, store.delete(orderId)];
                case 1:
                    result = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(userId != undefined)) return [3 /*break*/, 4];
                    return [4 /*yield*/, userStore.delete(userId)];
                case 3:
                    result = _a.sent();
                    _a.label = 4;
                case 4:
                    if (!(productId != undefined)) return [3 /*break*/, 6];
                    return [4 /*yield*/, productStore.delete(productId)];
                case 5:
                    result = _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); });
    it('should have a create method', function () {
        expect(store.create).toBeDefined();
    });
    it('should have a showActiveOrdersByUser method', function () {
        expect(store.showActiveOrdersByUser).toBeDefined();
    });
    it('should have a showCompletedOrdersByUser method', function () {
        expect(store.showCompletedOrdersByUser).toBeDefined();
    });
    it('create method should add an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.create({
                        product_id: productId,
                        quantity: orderQuantity,
                        user_id: userId,
                        status: parseInt(process.env.ACTIVE_ORDER)
                    })];
                case 1:
                    orderId = _a.sent();
                    expect(orderId).toBeGreaterThanOrEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('showActiveOrdersByUser method should return one record after creating an order with active', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.showActiveOrdersByUser(userId)];
                case 1:
                    result = _a.sent();
                    expect(result).toHaveSize(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('showCompletedOrdersByUser method should return no record after creating an order that was active', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.showCompletedOrdersByUser(userId)];
                case 1:
                    result = _a.sent();
                    expect(result).toHaveSize(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('changeOrderToBeCompletedByOrder method should return one updated record after creating an order that was active', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.changeOrderToBeCompletedByOrder(orderId)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('showCompletedOrdersByUser method should return one record after updating the order that was active', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.showCompletedOrdersByUser(userId)];
                case 1:
                    result = _a.sent();
                    expect(result).toHaveSize(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
