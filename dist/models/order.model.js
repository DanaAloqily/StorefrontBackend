"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const database_1 = __importDefault(require("../database"));
// building models as shown in the udacity tutorails
class orderModel {
    //show: get a specific order by user_id
    async show(user_id) {
        try {
            //step1: open conn with db
            const database = await database_1.default.connect();
            //step2: run sql query
            const sql = 'select * from orders where user_id=$1';
            const result = await database.query(sql, [user_id]);
            //step3: release db conn
            database.release();
            //step4: return new user
            console.log(JSON.stringify('order model show return ' + result.rows[0]));
            return result.rows[0];
        }
        catch (error) {
            throw new Error('Unable to find the order' + error);
        }
    }
    //create: place an order
    async create(o) {
        try {
            //step1: open conn with db
            const database = await database_1.default.connect();
            //step2: run sql query
            const sql = 'INSERT INTO orders ( status ,user_id) VALUES ($1, $2)';
            const result = await database.query(sql, [o.status, o.user_id]);
            //step3: release db conn
            database.release();
            //step4: return new user
            return result.rows[0];
        }
        catch (error) {
            throw new Error('Unable to place the order' + error);
        }
    }
    async add_product(order_id, product_id, quantity) {
        try {
            //step1: open conn with db
            const database = await database_1.default.connect();
            //step2: run sql query
            const sql = 'INSERT INTO order_products(order_id, product_id, quantity) VALUES ($1, $2, $3)';
            const result = await database.query(sql, [
                order_id,
                product_id,
                quantity
            ]);
            //step3: release db conn
            database.release();
            //step4: return new user
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to add product ${product_id} to order ${order_id}`);
        }
    }
}
exports.orderModel = orderModel;
