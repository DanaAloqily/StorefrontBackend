import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('at verify middleware 1 ');
    const header = req.get('Authorization');
    console.log(header);
    if (header) {
      const token = header.split(' ')[1];
      console.log('//////');
      console.log('verify middleware-token: ' + token);

      //console.log('before verify');
      const decodedToken = jwt.verify(
        token,
        config.tokensecret as unknown as string
      );

      // console.log(token);
      if (decodedToken) {
        console.log(decodedToken);
        next();
      } else {
        console.log('at verify middleware 2');
        return res
          .status(401)
          .send({ auth: false, message: 'No Token provided' });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: 'cant decode token'
    });
  }
};

export default verifyToken;

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
