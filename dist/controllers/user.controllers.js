"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = exports.index = exports.create = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const authentication_middleware_1 = __importDefault(require("../middleware/Authentication/authentication.middleware"));
const Usermodel = new user_model_1.default();
//create user
const create = async (req, res, next) => {
    try {
        const user = await Usermodel.create(req.body);
        //authentication will be checked first when creating a new user
        const token = await (0, authentication_middleware_1.default)(req.body.id, req.body.password);
        console.log(token);
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
        console.log('here 6' + error);
        next(error);
    }
};
exports.create = create;
//list all users
const index = async (req, res, next) => {
    try {
        const users = await Usermodel.index();
        res.status(200).send({
            message: 'users retrieved successfully',
            data: users
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
        console.log('here 3');
        next(error);
    }
};
exports.show = show;
/* export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, password } = req.body;

    const auth = await Usermodel.authenticate(id, password); //payload
    const token = jwt.sign({ auth }, config.tokensecret as unknown as string);

    if (!auth) {
      return res.status(401).send({
        //401:unautherized user
        message: 'the id & password does not match!'
      });
    }
    return res.status(200).send({
      data: { ...auth, token },
      message: 'authentication success'
    });
  } catch (error) {
    next(error);
  }
}; */
