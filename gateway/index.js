import express from 'express';
import httpProxy from 'express-http-proxy';
import URLS from './URLS';
import notfound from './notfound';

const app = express();
const port = process.env.PORT || 3000;
const {
  USERS_API_URL,
  FINANCIALS_API_URL,
} = URLS;

const userServiceProxy = httpProxy(USERS_API_URL);
const financialsServiceProxy = httpProxy(FINANCIALS_API_URL);

app.get('/', (req, res) => res.send('Gateway API'));

app.post('/users', (req, res, next) => userServiceProxy(req, res, next));
app.post('/users/login', (req, res, next) => userServiceProxy(req, res, next));
app.put('/users/changepassword/:id', (req, res, next) => userServiceProxy(req, res, next));
app.delete('/users/:id', (req, res, next) => userServiceProxy(req, res, next));

app.get('/financials', (req, res, next) => financialsServiceProxy(req, res, next));
app.get('/:id', (req, res, next) => financialsServiceProxy(req, res, next));
app.post('/', (req, res, next) => financialsServiceProxy(req, res, next));
app.put('/:id', (req, res, next) => financialsServiceProxy(req, res, next));
app.delete('/:id', (req, res, next) => financialsServiceProxy(req, res, next));

app.use(notfound);

app.listen(port, () =>
  console.log('Gateway on-line em http://localhost:%d', port)
);
