import {Router} from 'express';
import express, { Request, Response } from 'express';

const products_routes = Router();

products_routes.get('/',(req: Request, res:Response) =>{
    res.status(200).json({
        message:'hello world from products🛍'
    })
} ) 


//routes.get(./ , );
//routes.post(./ , );
//...


export default products_routes;