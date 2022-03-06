import { Express, Request, Response } from 'express';
const routes = (app: Express) => {
  app.get('/demo', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
}

export default routes;

// curl http://localhost:3000/demo