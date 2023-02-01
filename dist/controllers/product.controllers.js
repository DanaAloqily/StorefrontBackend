"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.show = exports.index = void 0;
const product_model_1 = require("../models/product.model");
const ProductModel = new product_model_1.productModel();
const index = async (req, res, next) => {
    try {
        const products = await ProductModel.index();
        console.log(products);
        res.status(200).send({
            message: 'products retrieved successfully',
            data: JSON.stringify({ ...products }, null, 2)
        });
    }
    catch (error) {
        next(error);
    }
};
exports.index = index;
const show = async (req, res, next) => {
    try {
        const product = await ProductModel.show(req.params.id);
        res.status(200).send({
            message: `product ${req.params.id} retrieved successfully`,
            data: JSON.stringify(product, null, 2)
        });
    }
    catch (error) {
        next(error);
    }
};
exports.show = show;
const create = async (req, res, next) => {
    try {
        const product = await ProductModel.create(req.body);
        res.status(200).send({
            message: `product: ${req.body.product_name} created successfully`
        });
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
