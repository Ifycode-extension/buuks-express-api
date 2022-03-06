import express, { IRouter } from 'express';
import { getDemoItemsHandler } from '../controllers/demo.controller';

let router: IRouter = express.Router();

router.get('/', getDemoItemsHandler);

export { router };
