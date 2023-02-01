import { NextFunction, Request, Response } from 'express';
import { productModel } from '../models/product.model';
import product from '../types/product.type';

const ProductModel = new productModel();

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products: product[] = await ProductModel.index();
    console.log(products);
    res.status(200).send({
      message: 'products retrieved successfully',
      data: JSON.stringify({ ...products }, null, 2)
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
    res.status(200).send({
      message: `product ${req.params.id} retrieved successfully`,
      data: JSON.stringify(product, null, 2)
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
    res.status(200).send({
      message: `product: ${req.body.product_name} created successfully`
    });
  } catch (error) {
    next(error);
  }
};
