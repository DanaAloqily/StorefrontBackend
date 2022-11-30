import {Router} from 'express';
import express, { Request, Response } from 'express';
import * as controllers from '../../controllers/product.controllers';

const products_routes = Router();

products_routes.get('/',(req: Request, res:Response) =>{
    res.status(200).json({
        message:'hello world from products🛍'
    })
} ) 
products_routes.route('/')
.get(controllers.index).post(controllers.create)
products_routes.route('/:id')
.get(controllers.show)

//routes.get(./ , );
//routes.post(./ , );
//...


export default products_routes;