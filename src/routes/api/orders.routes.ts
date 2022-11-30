import {Router} from 'express';
import express, { Request, Response } from 'express';
import * as controllers from '../../controllers/orders.controllers'

const orders_routes = Router();

orders_routes.get('/',(req: Request, res:Response) =>{
    res.status(200).json({
        message:'hello world from orders⌕'
    })

} ) 

orders_routes.route('/')
.post( controllers.create )
orders_routes.route('/:id').get(controllers.show)

export default orders_routes;