"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_product = exports.create = exports.show = void 0;
const order_model_1 = require("../models/order.model");
const user_model_1 = require("../models/user.model");
const Ordermodel = new order_model_1.orderModel();
const Usermodel = new user_model_1.userModel();
//get an order by user_id
const show = async (req, res, next) => {
    try {
        //const user: user = await Usermodel.show(req.params.id as unknown as string);
        const order = await Ordermodel.show(req.params.id);
        console.log(JSON.stringify(order));
        res.status(200).send({
            message: `order ${JSON.stringify(req.params.id)} retrieved successfuly`,
            data: JSON.stringify(order, null, 2)
        });
    }
    catch (error) {
        console.log('order controller - show');
        next(error);
    }
};
exports.show = show;
//create order
const create = async (req, res, next) => {
    try {
        const order = await Ordermodel.create(req.body);
        res.status(200).send({
            message: `order of user ${req.body.user_id} created successfuly`
        });
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
        res.status(200).send({
            message: `product of id ${req.body.product_id} added to order of id ${req.params.id} `
        });
    }
    catch (error) {
        next(error);
    }
};
exports.add_product = add_product;
