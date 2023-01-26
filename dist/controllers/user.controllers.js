"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = exports.index = exports.create = void 0;
const user_model_1 = require("../models/user.model");
const authentication_middleware_1 = __importDefault(require("../middleware/Authentication/authentication.middleware"));
const Usermodel = new user_model_1.userModel();
//create user
const create = async (req, res, next) => {
    try {
        const user = await Usermodel.create(req.body);
        //authentication will be checked first when creating a new user
        const token = await (0, authentication_middleware_1.default)(req.body.id, req.body.password);
        console.log('user controllers-create-token:' + token);
        if (token == 401) {
            res.status(401).send({ message: 'auth error' });
        }
        res.status(200).send({
            message: `user ${req.body.first_name} ${req.body.last_name} created successfuly`,
            data: { token }
        });
    }
    catch (error) {
        // sinceerror handling already handled
        console.log('user controllers-create' + error);
        next(error);
    }
};
exports.create = create;
//list all users
const index = async (req, res, next) => {
    try {
        const users = await Usermodel.index();
        //console.log('users result');
        res.status(200).send({
            message: 'users retrieved successfully',
            data: { ...users }
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
        console.log(req.params.id);
        const user = await Usermodel.show(req.params.id);
        res.status(200).send({
            message: `user ${user.first_name} ${user.last_name} retrieved successfuly`,
            data: { user }
        });
    }
    catch (error) {
        console.log('user controller - show');
        next(error);
    }
};
exports.show = show;
