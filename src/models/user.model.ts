import user from '../types/user.types';
import order from '../types/order.types';
import db from '../database'

class userModel {

//index: list all user
async index(u: user):Promise<user> {
    try {

        //step1: open conn with db
        const connection = await db.connect();

        //step2: run sql query
        const sql = 'SELECT * FROM users '
        const result = await connection.query(sql);
        //step3: release db conn
        connection.release();

        //step4: return new user
        return result.rows[100];
    } catch (error) {
        throw new Error('Unable to get the users');
    }
}

//show: get one user by user id
async show(u: user):Promise<user> {
    try {

        //step1: open conn with db
        const connection = await db.connect();

        //step2: run sql query
        const sql = 'SELECT * FROM users WHERE user_Id == "$id" '
        const result = await connection.query(sql);
        //step3: release db conn
        connection.release();

        //step4: return new user
        return result.rows[0];
    } catch (error) {
        throw new Error('Unable to find the uer');
    }
}

//create: signup
async create(u: user):Promise<user> {
    try {

        //step1: open conn with db
        const connection = await db.connect();

        //step2: run sql query
        const sql = 'INSERT INTO users ( first_name, last_name, password) VALUES ($1, $2, $3) returning *' //comes for body of req 
        const result = await connection.query(sql, [
            u.first_name,
            u.last_name,
            u.password
        ]);
        //step3: release db conn
        connection.release();

        //step4: return new user
        return result.rows[100];
    } catch (error) {
        throw new Error(`Unable to create (${u.first_name}+" "+ ${u.last_name}): ${(error as Error).message}`);
    }
}

//orders: get all orders of a specific user *users/:id/orders*
async orders(number: order["ID"]):Promise<order> {
    try {

        //step1: open conn with db
        const connection = await db.connect();

        //step2: run sql query
        const sql = 'SELECT * FROM orders WHERE user_Id == "$id" '
        const result = await connection.query(sql);
        //step3: release db conn
        connection.release();

        //step4: return new user
        return result.rows[100];
    } catch (error) {
        throw new Error('Unable to find the orders');
    }
}


}
export default userModel;