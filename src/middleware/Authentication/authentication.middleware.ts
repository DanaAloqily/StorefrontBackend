import { NextFunction, Request, Response } from 'express';
import userModel from '../../models/user.model';
import user from '../../types/user.types';
import db from '../../database';
import config from '../../middleware/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authenticate = async (id: string, password: string) => {
  try {
    const salt = parseInt(config.salt as string, 10);
    const connection = await db.connect();
    const sql = 'SELECT password FROM users WHERE id=$1';
    const result = await connection.query(sql, [id]);

    // console.log(password + config.pepper);
    console.log('auth middleware 1');
    if (result.rows.length) {
      const { password: hashPassword } = result.rows[0];
      console.log('auth midlleware: ' + password);
      const isPasswordValid = bcrypt.compareSync(
        `${password}${config.pepper}`,
        hashPassword
      );
      if (isPasswordValid) {
        const userInfo = await connection.query(
          'SELECT first_name, last_name FROM users WHERE id=($1)',
          [id]
        );
        const token = jwt.sign({ id }, config.tokensecret as unknown as string);
        return token;
      } else {
        connection.release();
        return 401;
      }
    }
  } catch (error) {
    throw new Error(`unable to find match: ${(error as Error).message}`);
  }
};
export default authenticate;
