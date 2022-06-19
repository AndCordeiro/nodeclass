import './loadEnv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import pkg from 'mongoose';
import cors from 'cors';
import notfound from './middleware/notfound';
import cfg from './config';
import routes from './routes';

const { connect } = pkg;
const port = process.env.PORT || 3002;

const app = express();

app.use(
  express.json(),
  express.urlencoded({
    extended: true,
  }),
  cors(),
  helmet(),
  morgan('combined'),
  routes,
  notfound
);

connect(cfg.db_path, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, () =>
  console.log('Servidor on-line em http://localhost:%d', port)
);
