import express, { Express, IRouter } from 'express';
import { app } from '../../app';
import { getDemoItemsHandler } from '../controllers/demo.controller';

let router: IRouter = express.Router();

router.get('/demo', getDemoItemsHandler);


export { router };






// const routes = (app: Express) => {
//   app.get('/demo', getDemoItemsHandler);
// }

// routes(app);
//export default routes;

// curl http://localhost:3000/demo