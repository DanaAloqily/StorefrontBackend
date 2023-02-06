"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("../product.model");
const Product = new product_model_1.productModel();
const prod = {
    id: 13,
    product_name: 'Socks',
    product_price: '15',
    product_category: 'clothing'
};
describe('product model', () => {
    it('should have an index method', () => {
        expect(Product.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(Product.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(Product.create).toBeDefined();
    });
    it('index method should return list of products', async () => {
        const result = await Product.index();
        expect(result).toBeDefined;
    });
    it('create method should add a product', async () => {
        const result = await Product.create({
            id: 7,
            product_name: 'Socks',
            product_price: '15',
            product_category: 'clothing'
        });
        expect(result).toEqual({
            id: prod.id,
            product_name: prod.product_name,
            product_price: prod.product_price,
            product_category: prod.product_category
        });
    });
    it('returns a product from id', async () => {
        const result = await Product.show('13');
        expect(result).toEqual({
            id: prod.id,
            product_name: result.product_name,
            product_price: result.product_price,
            product_category: result.product_category
        });
    });
});
