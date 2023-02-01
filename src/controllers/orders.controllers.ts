import { NextFunction, Request, Response } from 'express';
import { orderModel } from '../models/order.model';
import order from '../types/order.types';
import { userModel } from '../models/user.model';
import user from '../types/user.types';

const Ordermodel = new orderModel();
const Usermodel = new userModel();
//get an order by user_id
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //const user: user = await Usermodel.show(req.params.id as unknown as string);
    const order: order = await Ordermodel.show(
      req.params.id as unknown as string
    );
    console.log(JSON.stringify(order));
    res.status(200).send({
      message: `order ${JSON.stringify(req.params.id)} retrieved successfuly`,
      data: JSON.stringify(order, null, 2)
    });
  } catch (error) {
    console.log('order controller - show');
    next(error);
  }
};

//create order
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order: order = await Ordermodel.create(req.body);
    res.status(200).send({
      message: `order of user ${req.body.user_id} created successfuly`
    });
  } catch (error) {
    next(error);
  }
};

export const add_product = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Ordermodel.add_product(
      req.params.id, //order id
      req.body.product_id,
      req.body.quantity
    );
    res.status(200).send({
      message: `product of id ${req.body.product_id} added to order of id ${req.params.id} `
    });
  } catch (error) {
    next(error);
  }
};
