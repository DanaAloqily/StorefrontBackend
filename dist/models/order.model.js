"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class orderModel {
    //show: get a specific order by user_id
    async show(user_id) {
        try {
            //step1: open conn with db
            const connection = await database_1.default.connect();
            //step2: run sql query
            const sql = 'SELECT * FROM orders WHERE user_id =($1)';
            const result = await connection.query(sql, [user_id]);
            //step3: release db conn
            connection.release();
            //step4: return new user
            return result.rows[0];
        }
        catch (error) {
            throw new Error(error + 'Unable to find the order');
        }
    }
    //create: place an order
    async create(o) {
        try {
            //step1: open conn with db
            const connection = await database_1.default.connect();
            //step2: run sql query
            const sql = 'INSERT INTO orders ( status ,user_id) VALUES ($1, $2)';
            const result = await connection.query(sql, [o.status, o.user_id]);
            //step3: release db conn
            connection.release();
            //step4: return new user
            return result.rows[0];
        }
        catch (error) {
            throw new Error(error + 'Unable to place the order');
        }
    }
    async add_product(order_id, product_id, quantity) {
        try {
            //step1: open conn with db
            const connection = await database_1.default.connect();
            //step2: run sql query
            const sql = 'INSERT INTO order_products(order_id, product_id, quantity) VALUES ($1, $2, $3)';
            const result = await connection.query(sql, [
                order_id,
                product_id,
                quantity
            ]);
            //step3: release db conn
            connection.release();
            //step4: return new user
            return result.rows[0];
        }
        catch (error) {
            throw new Error(error + `Unable to add product ${product_id} to order ${order_id}`);
        }
    }
}
exports.default = orderModel;
