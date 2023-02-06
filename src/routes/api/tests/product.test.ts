import products_routes from '../products.routes';
import * as controllers from '../../../controllers/product.controllers';
import supertest from 'supertest';
import app from '../../../server';

const request = supertest(app);

describe('test product endpoint', function () {
  it('test index ', async (done) => {
    const response = await request.get('./api/products/');
    expect(response.status).toBe(200);
  });

  it('test show(product-id)', async (done) => {
    const response = await request.get('./api/products/1');
    expect(response.status).toBe(200);
  });

  it('test create', async (done) => {
    const response = await request.post('./api/products/');
    expect(response.status).toBe(200);
  });
});
