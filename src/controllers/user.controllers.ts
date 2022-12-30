import { NextFunction, Request, Response } from 'express';
import userModel from '../models/user.model';
import config from '../middleware/config';
import jwt from 'jsonwebtoken';
import user from '../types/user.types';
import authenticate from '../middleware/Authentication/authentication.middleware';

const Usermodel = new userModel();

//create user
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await Usermodel.create(req.body);
    //authentication will be checked first when creating a new user
    const token = await authenticate(req.body.id, req.body.password);
    console.log('user controllers-create-token:' + token);
    if (token == 401) {
      res.status(401).send({ message: 'auth error' });
    }
    res.status(200).send({
      message: `user ${req.body.first_name} ${req.body.last_name} created successfuly`,
      data: { token }
    });
  } catch (error) {
    // sinceerror handling already handled
    console.log('user controllers-create' + error);
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
    res.status(200).send({
      message: 'users retrieved successfully',
      data: users
    });
  } catch (error) {
    next(error);
  }
};
//get user by userID
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.params.id);
    const user = await Usermodel.show(req.params.id as unknown as string);

    res.status(200).send({
      message: `user ${user.first_name} ${user.last_name} retrieved successfuly`,
      data: { user }
    });
  } catch (error) {
    console.log('user controller - show');
    next(error);
  }
};
