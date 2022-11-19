import {Router} from 'express';
import user_routes from './api/user.routes';

const routes = Router();

routes.use('/user', user_routes);

export default routes ;