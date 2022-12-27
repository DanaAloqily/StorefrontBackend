import { Router } from 'express';
import express, { Request, Response } from 'express';
import * as controllers from '../../controllers/product.controllers';
import verifyToken from '../../middleware/Authentication/verifyToken.middleware';
const products_routes = Router();

/* products_routes.get('/',(req: Request, res:Response) =>{
    res.status(200).json({
        message:'hello world from products🛍'
    })
} )  */
products_routes
  .route('/')
  .get(controllers.index)
  .post(verifyToken, controllers.create);
products_routes.route('/:id').get(controllers.show);

export default products_routes;
