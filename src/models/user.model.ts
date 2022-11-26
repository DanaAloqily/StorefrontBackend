import user from '../types/user.types';
import order from '../types/order.types';
import db from '../database'

class userModel {

//index: list all user
async index():Promise<user[]> {
    try {

        //step1: open conn with db
        const connection = await db.connect();

        //step2: run sql query
        const sql = `SELECT id, firstName, lastName FROM users`
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
async show(id: string):Promise<user> {
    try {

        //step1: open conn with db
        const connection = await db.connect();

        //step2: run sql query
        const sql = `SELECT id, firstName, lastName FROM users WHERE id =($1)`;
        const result = await connection.query(sql,[id]);
        //step3: release db conn
        connection.release();

        //step4: return new user
        return result.rows[0];
    } catch (error) {
        throw new Error('Unable to find the user');
    }
}

//create: signup
async create(u: user):Promise<user> {
    try {

        //step1: open conn with db
        const connection = await db.connect();

        //step2: run sql query
        const sql = `INSERT INTO users ( firstName, lastName, password) VALUES ($1, $2, $3) returning id, firstName, lastName `; //comes for body of req 
        const result = await connection.query(sql, [
            u.firstName,
            u.lastName,
            u.password
        ]);
        //step3: release db conn
        connection.release();

        //step4: return new user
        return result.rows[100];
    } catch (error) {
        throw new Error(`Unable to create (${u.firstName}+" "+ ${u.lastName}): ${(error as Error).message}`);
    }
}

//orders: get all orders of a specific user *users/:id/orders*
async orders(id: string):Promise<order[]> {
    try {

        //step1: open conn with db
        const connection = await db.connect();

        //step2: run sql query
        const sql = `SELECT * FROM orders WHERE userID =($1) `;
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