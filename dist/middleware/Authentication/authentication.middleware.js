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
const authenticate = async (req, res, next) => {
    try {
        const salt = parseInt(config_1.default.salt, 10);
        const connection = await database_1.default.connect();
        const sql = 'SELECT password FROM users WHERE id=$1';
        const password = await connection.query(sql, [req.params.id]);
        if (password.rows.length) {
            const { password: hashPassword } = password.rows[0];
            const isPasswordValid = bcrypt_1.default.compareSync(`${password}${config_1.default.pepper}`, hashPassword);
            if (isPasswordValid) {
                const userInfo = await connection.query('SELECT first_name, last_name FROM users WHERE id=($1)', [req.params.id]);
                const token = jsonwebtoken_1.default.sign({ userInfo }, config_1.default.tokensecret);
                if (!userInfo) {
                    return res.status(401).send({
                        //401:unautherized user
                        message: 'the id & password does not match!'
                    });
                }
                return res.status(200).send({
                    data: { ...userInfo, token },
                    message: 'authentication success'
                });
            }
        }
        connection.release();
        return null;
        // no match
    }
    catch (error) {
        throw new Error(`unable to find match: ${error.message}`);
    }
};
exports.authenticate = authenticate;
exports.default = exports.authenticate;
