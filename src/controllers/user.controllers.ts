import  {  NextFunction, Request, Response } from 'express';
import userModel from '../models/user.model';

const Usermodel = new userModel();


export const create = async (req:Request , res:Response, next: NextFunction) => {
    try{
        const user = await Usermodel.create(req.body);
        res.json({
            status:'success',
            data: {...user},
            message:'user created successfuly'
        })





    }catch(error) {
        // sinceerror handling already handled
        next(error);
    }
  
}