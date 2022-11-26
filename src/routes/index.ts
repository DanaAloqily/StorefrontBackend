import {Router} from 'express';
import user_routes from './api/user.routes';
import orders_routes from './api/orders.routes';
import products_routes from './api/products.routes';
const routes = Router();

routes.use('/user', user_routes);
routes.use('/orders', orders_routes);
routes.use('/products', products_routes);

export default routes ;