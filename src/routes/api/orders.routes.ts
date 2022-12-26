import { Router } from 'express';
import express, { Request, Response } from 'express';
import * as controllers from '../../controllers/orders.controllers';
import isTokenValid from '../../middleware/auth.middleware';

const orders_routes = Router();

orders_routes.route('/').post(controllers.create);
orders_routes.route('/:user_id').get(isTokenValid, controllers.show);
orders_routes.route('/:id/products').post(controllers.add_product);

export default orders_routes;
