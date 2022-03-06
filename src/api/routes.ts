import { Express, Request, Response } from 'express';
import { getDemoItemsHandler } from './controllers/demo.controller';

const routes = (app: Express) => {
  app.get('/demo', getDemoItemsHandler);
}

export default routes;

// curl http://localhost:3000/demo