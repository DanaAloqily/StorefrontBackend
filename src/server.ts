import express, { request, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';
import db from './database';
import config from './middleware/config';

console.log(config)

const app: express.Application = express();
const address = '0.0.0.0:3000';
const PORT = 3000;

//logger middleare
app.use(morgan('common'));

//to parse incoming req
app.use(bodyParser.json());

//HTTP security middleware
app.use(helmet());

//limit # of requests to a server middleware
app.use(RateLimit({
  windowMs: 15* 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message:'to many requests from this IP!!'
}))

app.get('/', function (req: Request, res: Response) {
  throw new Error('Error found')
  res.json({
      message:'Hello World!!🌍'
  });
});
app.post('/', function (req: Request, res: Response) {
  res.json({
      message:'Hello World!!🌍 from post',
      //returned data
      data: req.body
  });
});


//error thrown in server handling
app.use(errorMiddleware);

app.use((_req:Request, res:Response) =>{
  res.status(404).json({
    message:'it appears you have lost your way!'
  })
})


app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});

export default app;