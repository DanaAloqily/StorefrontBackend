import { NextFunction, Request, Response } from 'express';
import userModel from '../models/user.model';
import config from '../middleware/config';
import jwt from 'jsonwebtoken';
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
      message: `user ${req.body.firstName} ${req.body.lastName} created successfuly`
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
    const users = await Usermodel.index();
    res.json({
      status: 'success',
      data: users,
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
      data: user,
      message: 'user retrieved successfuly'
    });
  } catch (error) {
    next(error);
  }
};
//get order by user id
export const orders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user/:id/orders
    const orders = await Usermodel.orders(req.params.id as unknown as string);
    res.json({
      status: 'success',
      data: orders,
      message: 'orders retrieved successfuly'
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
        status: 'error',
        message: 'the id & pssword does not match!'
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
