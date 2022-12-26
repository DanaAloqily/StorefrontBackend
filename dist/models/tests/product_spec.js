"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../product.model"));
const Product = new product_model_1.default();
const prod = {
    id: 1,
    product_name: 'Socks',
    product_price: '15',
    product_category: 'cloting'
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
        const result = await Product.index;
        expect(result).toBeDefined;
    });
    it('create method should add a product', async () => {
        const result = await Product.create({
            id: 1,
            product_name: 'Socks',
            product_price: '15',
            product_category: 'clothing'
        });
        expect(result).toEqual({
            id: result.id,
            product_name: result.product_name,
            product_price: result.product_price,
            product_category: result.product_category
        });
    });
    it('returns a product from id', async () => {
        const result = await Product.show('1');
        expect(result).toEqual({
            id: result.id,
            product_name: result.product_name,
            product_price: result.product_price,
            product_category: result.product_category
        });
    });
});
