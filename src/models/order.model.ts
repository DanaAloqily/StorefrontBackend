import user from '../types/user.types';
import product from '../types/product.type';
import order from '../types/order.types';
import db from '../database';

class orderModel {
  //show: get a specific order by user_id

  async show(user_id: string): Promise<order> {
    try {
      //step1: open conn with db
      const connection = await db.connect();

      //step2: run sql query
      const sql = 'SELECT * FROM orders WHERE user_id =($1)';
      const result = await connection.query(sql, [user_id]);
      //step3: release db conn
      connection.release();

      //step4: return new user
      return result.rows[0];
    } catch (error) {
      throw new Error('Unable to find the order');
    }
  }

  //create: place an order
  async create(o: order): Promise<order> {
    try {
      //step1: open conn with db
      const connection = await db.connect();

      //step2: run sql query
      const sql = 'INSERT INTO orders ( status ,user_id) VALUES ($1, $2)';
      const result = await connection.query(sql, [o.status, o.user_id]);
      //step3: release db conn
      connection.release();

      //step4: return new user
      return result.rows[0];
    } catch (error) {
      throw new Error('Unable to place the order');
    }
  }

  async add_product(
    order_id: string,
    product_id: string,
    quantity: string
  ): Promise<order> {
    try {
      //step1: open conn with db
      const connection = await db.connect();

      //step2: run sql query
      const sql =
        'INSERT INTO order_products(order_id, product_id, quantity) VALUES ($1, $2, $3)';
      const result = await connection.query(sql, [
        order_id,
        product_id,
        quantity
      ]);
      //step3: release db conn
      connection.release();
      //step4: return new user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to add product ${product_id} to order ${order_id}`
      );
    }
  }
}
export default orderModel;
