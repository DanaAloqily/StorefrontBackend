import express, { Request, Response } from 'express';
import * as controllers from '../../controllers/user.controllers';

const user_routes = express.Router();

/* user_routes.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'hello world from user👤'
  });
}); */

// api/user
user_routes
  .route('/')
  .get(controllers.index)
  .post(controllers.create)
  .post(controllers.authenticate);
user_routes.route('/:id').get(controllers.show);
user_routes.route('/:id/orders').get(controllers.orders);

export default user_routes;
