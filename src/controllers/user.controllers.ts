import { NextFunction, Request, Response } from 'express';
import userModel from '../models/user.model';
import config from '../middleware/config';
import jwt from 'jsonwebtoken';
import user from '../types/user.types';
import order from '../types/order.types';

const Usermodel = new userModel();

//create user
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await Usermodel.create(req.body);
    res.json({
      status: 'success',
      data: { ...user },
      message: `user ${req.body.first_name} ${req.body.last_name} created successfuly`
    });
  } catch (error) {
    // sinceerror handling already handled
    next(error);
  }
};

//list all users
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: user[] = await Usermodel.index();
    res.json({
      status: 'success',
      data: { ...users },
      message: 'Users retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};
//get user by userID
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await Usermodel.show(req.params.id as unknown as string);
    res.json({
      status: 'success',
      data: { ...user },
      message: 'user retrieved successfuly'
    });
  } catch (error) {
    next(error);
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, password } = req.body;

    const auth = await Usermodel.authenticate(id, password); //payload
    const token = jwt.sign({ auth }, config.tokensecret as unknown as string);

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
  } catch (error) {
    next(error);
  }
};
