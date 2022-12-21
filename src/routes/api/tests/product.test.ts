import products_routes from '../products.routes';
import * as controllers from '../../../controllers/product.controllers';

it('test the order route with order id', async (done) => {
  const response = await products_routes.route('./1').get(controllers.show);
  expect(response).toBeTrue();
});
