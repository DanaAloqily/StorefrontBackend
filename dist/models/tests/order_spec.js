"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../order.model");
const order = new order_model_1.orderModel();
const or = {
    id: 1,
    status: 'proccessing',
    user_id: '1'
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
            id: 1,
            user_id: '1',
            status: 'proccessing'
        });
        expect(result).toEqual({
            id: or.id,
            status: or.status,
            user_id: or.user_id
        });
    });
    it('show method should return the correct order', async () => {
        const result = await order.show('1');
        expect(result).toEqual({
            id: or.id,
            status: or.status,
            user_id: or.user_id
        });
    });
});
