import { Router } from 'express';
import express, { Request, Response } from 'express';
import * as controllers from '../../controllers/orders.controllers';
import verifyToken from '../../middleware/Authentication/verifyToken.middleware';
const orders_routes = Router();

orders_routes.route('/').post(verifyToken, controllers.create);
orders_routes.route('/:user_id').get(verifyToken, controllers.show);
orders_routes.route('/:id/products').post(verifyToken, controllers.add_product);

export default orders_routes;
