import user from '../../types/user.types';
import { userModel } from '../user.model';
const User = new userModel();
const test = {
  id: '1',
  first_name: 'Tala',
  last_name: 'Aloqily',
  password: 'Test234'
} as user;

describe('user model', () => {
  it('should have an index method', () => {
    expect(User.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(User.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(User.create).toBeDefined();
  });

  it('index method should return list of users', async () => {
    const result = await User.index;
    expect(result).toBeDefined;
  });

  it('create method should add a user', async () => {
    const result = await User.create({
      first_name: 'Tala',
      last_name: 'Aloqily',
      password: 'Test234'
    });
    expect(result).toBeDefined();
  });
  it('show method returns all users', async () => {
    const result: user[] = await User.index();
    expect(result).toHaveSize(1);
  });
});
