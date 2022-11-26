import {Router} from 'express';
import app from '../../server';
import express, { Request, Response } from 'express';
import { or } from 'react-native-reanimated';

const orders_routes = Router();

orders_routes.get('/',(req: Request, res:Response) =>{
    res.status(200).json({
        message:'hello world from orders⌕'
    })
} ) 

export default orders_routes;