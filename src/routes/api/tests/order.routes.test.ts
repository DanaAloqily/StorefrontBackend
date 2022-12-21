import orders_routes from '../orders.routes';
import * as controllers from '../../../controllers/orders.controllers';

it('test the order route with order id', async (done) => {
  const response = await orders_routes.route('./1').get(controllers.show);
  expect(response).toBeTrue();
});
