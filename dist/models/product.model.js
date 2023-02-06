"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const database_1 = __importDefault(require("../database"));
// building models as shown in the udacity tutorails
class productModel {
    //index: list all procducts
    async index() {
        try {
            //step1: open conn with db
            const database = await database_1.default.connect();
            //step2: run sql query
            const sql = 'SELECT * FROM products ';
            const result = await database.query(sql);
            //step3: release db conn
            database.release();
            //step4: return new user
            return result.rows[0];
        }
        catch (error) {
            throw new Error('Unable to list the products');
        }
    }
    //show: get a specific product by productID
    async show(id) {
        try {
            //step1: open conn with db
            const database = await database_1.default.connect();
            //step2: run sql query
            const sql = 'SELECT * FROM products WHERE id=($1) ';
            const result = await database.query(sql, [id]);
            //step3: release db conn
            database.release();
            //step4: return new user
            return result.rows[0];
        }
        catch (error) {
            throw new Error(error + 'Unable to find the product');
        }
    }
    //create: create a product
    async create(p) {
        try {
            //step1: open conn with db
            const database = await database_1.default.connect();
            //step2: run sql query
            const sql = 'INSERT INTO products ( product_name, product_price, product_category) VALUES ($1, $2, $3) returning id, product_name, product_price, product_category';
            const result = await database.query(sql, [
                p.product_name,
                p.product_price,
                p.product_category
            ]);
            //step3: release db conn
            database.release();
            //step4: return new user
            return result.rows[0];
        }
        catch (error) {
            console.log(error);
            throw new Error(error + ' Unable to create the product');
        }
    }
}
exports.productModel = productModel;
