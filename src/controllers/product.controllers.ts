import { NextFunction, Request, Response } from 'express';
import productModel from '../models/product.model';
import product from '../types/product.type';

const ProductModel = new productModel();

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products: product[] = await ProductModel.index();
    res.json({
      status: 'success',
      data: { ...products },
      message: 'products retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product: product = await ProductModel.show(
      req.params.id as unknown as string
    );

    res.json({
      status: 'success',
      data: { ...product },
      message: `product ${req.params.id} retrieved successfully`
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product: product = await ProductModel.create(req.body);

    res.json({
      status: 'success',
      data: { product },
      message: 'product created successfully'
    });
  } catch (error) {
    next(error);
  }
};
