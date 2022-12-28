"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const database_1 = __importDefault(require("../../database"));
const config_1 = __importDefault(require("../../middleware/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = async (id, password) => {
    try {
        const salt = parseInt(config_1.default.salt, 10);
        const connection = await database_1.default.connect();
        const sql = 'SELECT password FROM users WHERE id=$1';
        const result = await connection.query(sql, [id]);
        // console.log(password + config.pepper);
        console.log('before if compare');
        if (result.rows.length) {
            console.log('inside if compare');
            const { password: hashPassword } = result.rows[0];
            console.log(password);
            const isPasswordValid = bcrypt_1.default.compareSync(`${password}${config_1.default.pepper}`, hashPassword);
            if (isPasswordValid) {
                const userInfo = await connection.query('SELECT first_name, last_name FROM users WHERE id=($1)', [id]);
                const token = jsonwebtoken_1.default.sign({ id }, config_1.default.tokensecret);
                return token;
            }
            else {
                connection.release();
                return 401;
            }
        }
    }
    catch (error) {
        throw new Error(`unable to find match: ${error.message}`);
    }
};
exports.authenticate = authenticate;
exports.default = exports.authenticate;
