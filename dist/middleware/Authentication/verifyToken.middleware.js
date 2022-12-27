"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const verifyToken = (req, res, next) => {
    try {
        console.log('here 4');
        const header = req.get('Authorization');
        if (header) {
            const token = header.split(' ')[1];
            const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.tokensecret);
            // console.log(token);
            if (decodedToken) {
                next();
            }
            else {
                console.log('here 5');
                return res
                    .status(401)
                    .send({ auth: false, message: 'No Token provided' });
            }
        }
    }
    catch {
        console.log('here 2');
        res.status(401).send({
            message: 'invalid request'
        });
    }
};
exports.default = verifyToken;
/*
  const token = req.headers['x-access-token'];

  if (!token)
    return res.status(401).send({ auth: false, message: 'No token provided.' });

  const decoded = jwt.verify(
    token as unknown as string,
    config.tokensecret as unknown as string
  );

  if (decoded) {
    req.user_id = decoded.id;
    next();
  } else {
    return res
      .status(500)
      .send({ auth: false, message: 'Failed to authenticate token.' });
  }
  //res.status(200).send(decoded);
}; */
/* import { Request, Response, NextFunction } from 'express';
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

//by zanaty
 */
