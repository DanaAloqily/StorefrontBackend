"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
const handleUnauthorizedError = (next) => {
    const error = new Error('Login Error: Please try again');
    error.status = 401;
    next(error);
};
//middleware by zanaty
const isTokenValid = (req, _res, next) => {
    try {
        // get authHeader
        const authHeader = req.get('Authorization');
        //  console.log(authHeader);
        if (authHeader) {
            const bearer = authHeader.split(' ')[0].toLowerCase();
            const token = authHeader.split(' ')[1];
            if (token && bearer === 'bearer') {
                const decode = jsonwebtoken_1.default.verify(token, config_1.default.tokensecret);
                if (decode) {
                    next();
                }
                else {
                    // failed to authenticate user
                    handleUnauthorizedError(next);
                }
            }
            else {
                // token type not bearer
                handleUnauthorizedError(next);
            }
        }
        else {
            // no token provided
            handleUnauthorizedError(next);
        }
    }
    catch (error) {
        handleUnauthorizedError(next);
    }
};
exports.default = isTokenValid;
