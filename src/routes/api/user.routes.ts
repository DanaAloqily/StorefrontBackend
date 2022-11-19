import express, { Request, Response } from 'express';
import * as controllers from '../../controllers/user.controllers';

const user_routes = express.Router();


user_routes.post('/' , controllers.create );
user_routes.get('/' , controllers.create );
//routes.post(./ , );
//...


export default user_routes;