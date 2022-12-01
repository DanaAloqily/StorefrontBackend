import user from '../types/user.types';
import order from '../types/order.types';
import db from '../database';
import config from '../middleware/config';
import bcrypt from 'bcrypt';

//This function will return a hashed password
const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

class userModel {
  //index: list all user
  async index(): Promise<user[]> {
    try {
      //step1: open conn with db
      const connection = await db.connect();

      //step2: run sql query
      const sql = 'SELECT id, firstName, lastName FROM users';
      const result = await connection.query(sql);
      //step3: release db conn
      connection.release();

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
      const connection = await db.connect();

      //step2: run sql query
      const sql = 'select * from users where id=($1)';
      const result = await connection.query(sql, [id]);
      //step3: release db conn
      connection.release();

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
      const connection = await db.connect();

      //step2: run sql query
      const sql =
        'INSERT INTO users ( firstName, lastName, password) VALUES ($1, $2, $3) returning id, firstName, lastName '; //comes for body of req
      const result = await connection.query(sql, [
        u.firstName,
        u.lastName,
        hashPassword(u.password)
      ]);
      //step3: release db conn
      connection.release();

      //step4: return new user
      return result.rows[100];
    } catch (error) {
      throw new Error(
        `Unable to create (${u.firstName}+" "+ ${u.lastName}): ${
          (error as Error).message
        }`
      );
    }
  }

  //orders: get all orders of a specific user *users/:id/orders*
  async orders(id: string): Promise<order[]> {
    try {
      //step1: open conn with db
      const connection = await db.connect();

      //step2: run sql query
      const sql = 'SELECT * FROM orders WHERE userID =($1) ';
      const result = await connection.query(sql);
      //step3: release db conn
      connection.release();

      //step4: return new user
      return result.rows[100];
    } catch (error) {
      throw new Error('Unable to find the orders');
    }
  }

  async authenticate(id: string, password: string): Promise<user | null> {
    try {
      const salt = parseInt(config.salt as string, 10);

      const connection = await db.connect();
      const sql = 'SELECT password FROM users WHERE id=$1';
      const result = await connection.query(sql, [id]);

      console.log(password + config.pepper);

      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPassword
        );
        if (isPasswordValid) {
          const userInfo = await connection.query(
            'SELECT firstName, lastName FROM users WHERE id=($1)',
            [id]
          );
          return userInfo.rows[0];
        }
      }
      connection.release();
      return null; // no match
    } catch (error) {
      throw new Error(`unable to find match: ${(error as Error).message}`);
    }
  }
}
export default userModel;
