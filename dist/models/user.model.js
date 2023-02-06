"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const database_1 = __importDefault(require("../database"));
const config_1 = __importDefault(require("../middleware/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// building models as shown in the udacity tutorails
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
            const database = await database_1.default.connect();
            //step2: run sql query
            const sql = 'select first_name, last_name from users';
            const result = await database.query(sql);
            console.log('users result  ' + JSON.stringify(result.rows[100]));
            //step3: release db conn
            database.release();
            //step4: return new user
            // console.log(result.rows[0])
            return result.rows[0];
        }
        catch (error) {
            throw new Error('Unable to get the users');
        }
    }
    //show: get one user by user id
    async show(id) {
        try {
            //step1: open conn with db
            const database = await database_1.default.connect();
            //step2: run sql query
            const sql = 'select * from users where id=$1';
            const result = await database.query(sql, [id]);
            //step3: release db conn
            database.release();
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
            const database = await database_1.default.connect();
            //step2: run sql query
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) returning id, first_name, last_name '; //comes for body of req
            const result = await database.query(sql, [
                u.first_name,
                u.last_name,
                hashPassword(u.password)
            ]);
            //step3: release db conn
            database.release();
            //step4: return new user
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to create (${u.first_name}+" "+ ${u.last_name}): ${error.message}`);
        }
    }
}
exports.userModel = userModel;
