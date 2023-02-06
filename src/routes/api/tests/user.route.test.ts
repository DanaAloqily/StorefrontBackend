import user_routes from '../user.routes';
import * as controllers from '../../../controllers/user.controllers';
import supertest from 'supertest';
import app from '../../../server';

const request = supertest(app);
describe('test user endpoints', function () {
  it('test index ', async (done) => {
    const response = await request.get('./api/user/');
    expect(response.status).toBe(200);
  });

  it('test show(id)', async (done) => {
    const response = await request.get('./api/user/3');
    expect(response.status).toBe(200);
  });
  it('test create', async (done) => {
    const response = await request.post('./api/user/');
    expect(response.status).toBe(200);
  });
});
