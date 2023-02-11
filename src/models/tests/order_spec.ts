import user from '../../types/user.types';
import { orderModel } from '../order.model';
import { userModel } from '../user.model';
const order = new orderModel();
const userM = new userModel();

const or = {
  id: 1,
  status: 'proccessing',
  user_id: '1'
};
const us = {
  // id : 1,
  first_name: 'test',
  last_name: 'test',
  password: 'test'
} as user;

describe('order model', () => {
  it('create user to test order', async () => {
    const user = await userM.create(us);
    expect(user).toBeDefined();
  });

  it('should have a show method', () => {
    expect(order.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(order.create).toBeDefined();
  });

  it('create method should add an order', async () => {
    const result = await order.create({
      id: 1,
      user_id: '1',
      status: 'proccessing'
    });
    expect(result).toBeDefined;
  });

  it('show method should return the correct order', async () => {
    const result = await order.show('1');
    expect(result).toEqual({
      id: or.id,
      status: or.status,
      user_id: or.user_id
    });
  });
});
