"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_product = exports.create = exports.show = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const Ordermodel = new order_model_1.default();
const Usermodel = new user_model_1.default();
//get an order by user_id
const show = async (req, res, next) => {
    try {
        const user = await Usermodel.show(req.params.id);
        const order = await Ordermodel.show(req.params.id);
        res.status(200).send({
            message: `order ${order.id} with status ${order.status} retrieved successfuly`
        });
    }
    catch (error) {
        next(error);
    }
};
exports.show = show;
//create order
const create = async (req, res, next) => {
    try {
        const order = await Ordermodel.create(req.body);
        res
            .status(200)
            .send({ message: `order of user ${order.user_id} created successfuly` });
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const add_product = async (req, res, next) => {
    try {
        const order = await Ordermodel.add_product(req.params.id, //order id
        req.body.product_id, req.body.quantity);
        res
            .status(200)
            .send({
            message: `product ${req.body.product_id} added to order ${order.id} `
        });
    }
    catch (error) {
        next(error);
    }
};
exports.add_product = add_product;
