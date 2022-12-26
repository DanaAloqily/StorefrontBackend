"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./api/user.routes"));
const orders_routes_1 = __importDefault(require("./api/orders.routes"));
const products_routes_1 = __importDefault(require("./api/products.routes"));
const routes = (0, express_1.Router)();
routes.use('/user', user_routes_1.default);
routes.use('/orders', orders_routes_1.default);
routes.use('/products', products_routes_1.default);
exports.default = routes;
