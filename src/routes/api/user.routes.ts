import express, { Request, Response } from 'express';
import * as controllers from '../../controllers/user.controllers';
import isTokenValid from '../../middleware/auth.middleware';

const user_routes = express.Router();

/* user_routes.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'hello world from user👤'
  });
}); */

// api/user
user_routes
  .route('/')
  .get(isTokenValid, controllers.index)
  .post(isTokenValid, controllers.create)
  .post(isTokenValid, controllers.authenticate);
user_routes.route('/:id').get(isTokenValid, controllers.show);

export default user_routes;
