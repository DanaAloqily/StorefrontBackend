import express, { Request, Response } from 'express';
import * as controllers from '../../controllers/user.controllers';
import authenticate from '../../middleware/Authentication/authentication.middleware';
import verifyToken from '../../middleware/Authentication/verifyToken.middleware';
const user_routes = express.Router();

/* user_routes.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'hello world from user👤'
  });
}); */

// api/user
user_routes.route('/').get(controllers.index).post(controllers.create);
//verfying token will happen after creating and before retieval
user_routes.route('/:id').get(verifyToken, controllers.show);

export default user_routes;

// for token testing, token in postman must be same as token created for the same user (id)
