"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = __importDefault(require("../order.model"));
const order = new order_model_1.default();
const or = {
    id: 1,
    status: 'proccessing',
    user_id: 1
};
describe('order model', () => {
    it('should have a show method', () => {
        expect(order.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(order.create).toBeDefined();
    });
    it('create method should add an order', async () => {
        const result = await order.create({
            user_id: '1',
            status: 'proccessing'
        });
        expect(result).toEqual({
            id: result.id,
            status: result.status,
            user_id: result.user_id
        });
    });
    it('show method should return the correct order', async () => {
        const result = await order.show('1');
        expect(result).toEqual({
            id: result.id,
            status: result.status,
            user_id: result.user_id
        });
    });
});
