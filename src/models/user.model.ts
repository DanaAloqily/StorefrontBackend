import user from '../types/user.types';
import order from '../types/order.types';
import db from '../database';
import config from '../middleware/config';
import bcrypt from 'bcrypt';
import { QueryResult } from 'pg';

// building models as shown in the udacity tutorails

//This function will return a hashed password
const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

export class userModel {
  //index: list all user
  async index(): Promise<user[]> {
    try {
      //step1: open conn with db
      const database = await db.connect();

      //step2: run sql query
      const sql = 'select first_name, last_name from users';
      const result = await database.query(sql);
      console.log('users result  ' + JSON.stringify(result.rows[100]));
      //step3: release db conn
      database.release();

      //step4: return new user
      // console.log(result.rows[0])
      return result.rows[100];
    } catch (error) {
      throw new Error('Unable to get the users');
    }
  }

  //show: get one user by user id
  async show(id: string): Promise<user> {
    try {
      //step1: open conn with db
      const database = await db.connect();

      //step2: run sql query
      const sql = 'select * from users where id=$1';
      const result = await database.query(sql, [id]);
      //step3: release db conn
      database.release();

      //step4: return new user
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error('Unable to find the user');
    }
  }

  //create: signup
  async create(u: user): Promise<user> {
    try {
      //step1: open conn with db
      const database = await db.connect();
      //step2: run sql query
      const sql =
        'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) returning id, first_name, last_name '; //comes for body of req
      const result = await database.query(sql, [
        u.first_name,
        u.last_name,
        hashPassword(u.password)
      ]);

      //step3: release db conn
      database.release();

      //step4: return new user
      return result.rows[100];
    } catch (error) {
      throw new Error(
        `Unable to create (${u.first_name}+" "+ ${u.last_name}): ${
          (error as Error).message
        }`
      );
    }
  }
}
