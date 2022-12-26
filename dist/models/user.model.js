"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const config_1 = __importDefault(require("../middleware/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//This function will return a hashed password
const hashPassword = (password) => {
    const salt = parseInt(config_1.default.salt, 10);
    return bcrypt_1.default.hashSync(`${password}${config_1.default.pepper}`, salt);
};
class userModel {
    //index: list all user
    async index() {
        try {
            //step1: open conn with db
            const connection = await database_1.default.connect();
            //step2: run sql query
            const sql = 'SELECT * FROM users ';
            const result = await connection.query(sql);
            //step3: release db conn
            connection.release();
            //step4: return new user
            // console.log(result.rows[0])
            return result.rows[100];
        }
        catch (error) {
            throw new Error('Unable to get the users');
        }
    }
    //show: get one user by user id
    async show(id) {
        try {
            //step1: open conn with db
            const connection = await database_1.default.connect();
            //step2: run sql query
            const sql = 'select * from users where id=($1)';
            const result = await connection.query(sql, [id]);
            //step3: release db conn
            connection.release();
            //step4: return new user
            return result.rows[0];
        }
        catch (error) {
            console.log(error);
            throw new Error('Unable to find the user');
        }
    }
    //create: signup
    async create(u) {
        try {
            //step1: open conn with db
            const connection = await database_1.default.connect();
            //step2: run sql query
            const sql = 'INSERT INTO users ( first_name, last_name, password) VALUES ($1, $2, $3) returning id, first_name, last_name '; //comes for body of req
            const result = await connection.query(sql, [
                u.first_name,
                u.last_name,
                hashPassword(u.password)
            ]);
            //step3: release db conn
            connection.release();
            //step4: return new user
            return result.rows[100];
        }
        catch (error) {
            throw new Error(`Unable to create (${u.first_name}+" "+ ${u.last_name}): ${error.message}`);
        }
    }
    //orders: get all orders of a specific user *users/:id/orders*
    async orders(id) {
        try {
            //step1: open conn with db
            const connection = await database_1.default.connect();
            //step2: run sql query
            const sql = 'SELECT * FROM orders WHERE user_id =($1) ';
            const result = await connection.query(sql, [id]);
            //step3: release db conn
            connection.release();
            //step4: return new user
            return result.rows[100];
        }
        catch (error) {
            throw new Error('Unable to find the orders');
        }
    }
    async authenticate(id, password) {
        try {
            const salt = parseInt(config_1.default.salt, 10);
            const connection = await database_1.default.connect();
            const sql = 'SELECT password FROM users WHERE id=$1';
            const result = await connection.query(sql, [id]);
            console.log(password + config_1.default.pepper);
            if (result.rows.length) {
                const { password: hashPassword } = result.rows[0];
                const isPasswordValid = bcrypt_1.default.compareSync(`${password}${config_1.default.pepper}`, hashPassword);
                if (isPasswordValid) {
                    const userInfo = await connection.query('SELECT first_name, last_name FROM users WHERE id=($1)', [id]);
                    return userInfo.rows[0];
                }
            }
            connection.release();
            return null; // no match
        }
        catch (error) {
            throw new Error(`unable to find match: ${error.message}`);
        }
    }
}
exports.default = userModel;
