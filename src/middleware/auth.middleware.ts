import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Error from '../interfaces/error.interface';
import config from './config';

const handleUnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error('Login Error: Please try again');
  error.status = 401;
  next(error);
};
//middleware by zanaty

const isTokenValid = (req: Request, _res: Response, next: NextFunction) => {
  try {
    // get authHeader
    const authHeader = req.get('Authorization');
    //  console.log(authHeader);
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(
          token,
          config.tokensecret as unknown as string
        );
        if (decode) {
          next();
        } else {
          // failed to authenticate user
          handleUnauthorizedError(next);
        }
      } else {
        // token type not bearer
        handleUnauthorizedError(next);
      }
    } else {
      // no token provided
      handleUnauthorizedError(next);
    }
  } catch (error) {
    handleUnauthorizedError(next);
  }
};

export default isTokenValid;
