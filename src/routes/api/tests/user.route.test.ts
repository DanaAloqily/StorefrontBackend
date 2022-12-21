import user_routes from '../user.routes';
import * as controllers from '../../../controllers/user.controllers';

it('test the order route with order id', async (done) => {
  const response = await user_routes.route('./1').get(controllers.show);
  expect(response).toBeTrue();
});
