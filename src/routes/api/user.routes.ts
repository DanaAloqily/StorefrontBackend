import express, { Request, Response } from 'express';
import * as controllers from '../../controllers/user.controllers';

const user_routes = express.Router();

/* user_routes.get('/',(req: Request, res:Response) =>{
    res.status(200).json({
        message:'hello world from user👤'
    })
} ) */

// api/user
user_routes.route('/')
.get(controllers.index).post( controllers.create )
user_routes.route('/:id')
.get(controllers.show).get(controllers.orders)

;

//user_routes.get('/' , controllers.create );
//routes.post(./ , );
//...


export default user_routes;