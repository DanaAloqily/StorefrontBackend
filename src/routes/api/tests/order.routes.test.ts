import orders_routes from '../orders.routes';
import * as controllers from '../../../controllers/orders.controllers';
import supertest = require('supertest');
import app from '../../../server';

const request = supertest(app);
describe('test orders endpoints', function () {
  it('test index ', async (done) => {
    const response = await request.get('./api/orders/');
    expect(response.status).toBe(200);
  });

  it('test show(user-id)', async (done) => {
    const response = await request.get('./api/orders/3');
    expect(response.status).toBe(200);
  });
  it('test create', async (done) => {
    const response = await request.post('./api/orders/');
    expect(response.status).toBe(200);
  });
  it('test add product', async (done) => {
    const response = await request.post('./api/orders/1/products');
    expect(response.status).toBe(200);
  });
});
