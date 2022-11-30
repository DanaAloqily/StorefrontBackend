import  {  NextFunction, Request, Response } from 'express';
import orderModel from '../models/order.model';


const Ordermodel = new orderModel();
//get an order by orderID
export const show =async (req:Request, res:Response, next:NextFunction) => {
    try{
        const order = await Ordermodel.show(req.params.id as unknown as string)
        res.json({
            status:"success",
            data: order,
            message:`order retrieved successfuly`
        })
        

    }catch(error){
next(error)
    }
}

//create order
export const create =async (req:Request, res:Response,next:NextFunction) => {
    try{

const order = await Ordermodel.create(req.body)
res.json({
    status:"success",
    data: {...order},
    message:`order of ${req.body.userID} created successfuly`
})

    }catch(error){
        next(error)
    }
}