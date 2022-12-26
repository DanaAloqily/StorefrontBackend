"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.orders = exports.show = exports.index = exports.create = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const config_1 = __importDefault(require("../middleware/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Usermodel = new user_model_1.default();
//create user
const create = async (req, res, next) => {
    try {
        const user = await Usermodel.create(req.body);
        res.json({
            status: 'success',
            data: { ...user },
            message: `user ${req.body.first_name} ${req.body.last_name} created successfuly`
        });
    }
    catch (error) {
        // sinceerror handling already handled
        next(error);
    }
};
exports.create = create;
//list all users
const index = async (req, res, next) => {
    try {
        const users = await Usermodel.index();
        res.json({
            status: 'success',
            data: { ...users },
            message: 'Users retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
exports.index = index;
//get user by userID
const show = async (req, res, next) => {
    try {
        const user = await Usermodel.show(req.params.id);
        res.json({
            status: 'success',
            data: { ...user },
            message: 'user retrieved successfuly'
        });
    }
    catch (error) {
        next(error);
    }
};
exports.show = show;
//get order by user id
const orders = async (req, res, next) => {
    try {
        //user/:id/orders
        const orders = await Usermodel.orders(req.params.id);
        res.json({
            status: 'success',
            data: orders,
            message: 'orders retrieved successfuly'
        });
    }
    catch (error) {
        next(error);
    }
};
exports.orders = orders;
const authenticate = async (req, res, next) => {
    try {
        const { id, password } = req.body;
        const auth = await Usermodel.authenticate(id, password); //payload
        const token = jsonwebtoken_1.default.sign({ auth }, config_1.default.tokensecret);
        if (!auth) {
            return res.status(401).json({
                //401:unautherized user
                status: 'error',
                message: 'the id & password does not match!'
            });
        }
        return res.json({
            status: 'success',
            data: { ...auth, token },
            message: 'authentication success'
        });
    }
    catch (error) {
        next(error);
    }
};
exports.authenticate = authenticate;
