import express, { request, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import routes from './routes';

//console.log(config)

const app: express.Application = express();
const address = '0.0.0.0:3000';
const PORT = 3000;

//logger middleare
app.use(morgan('common'));

//to parse incoming req
app.use(bodyParser.json());

app.use('/api', routes);

app.get('/', function (req: Request, res: Response) {
  // throw new Error('Error found')
  res.json({
    message: 'Hello World!!🌍'
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'it appears you have lost your way!'
  });
});

app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
