import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();
const address = '0.0.0.0:3000';
const PORT = 3000;
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.json({
      message:'Hello World!!🌍'
  });
});

app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});

export default app;