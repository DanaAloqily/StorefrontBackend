"use strict";
//Configurations file
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, NODE_env, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_USER, POSTGRES_PASSWORD, BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;
exports.default = {
    env: NODE_env,
    port: PORT,
    host: POSTGRES_HOST,
    dbport: POSTGRES_PORT,
    database: NODE_env === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    pepper: BCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
    tokensecret: TOKEN_SECRET
};
