import { Router } from 'express';
import financialRouter from './financial-routes';

const routes = Router();

routes.use('/financials', financialRouter);

export default routes;
