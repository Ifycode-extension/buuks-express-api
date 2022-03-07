import express, { IRouter } from 'express';
import {
  getDemoItemsHandler,
  createDemoItemHandler
} from '../controllers/demo.controller';

let router: IRouter = express.Router();

router.get('/', getDemoItemsHandler);
router.post('/', createDemoItemHandler);

export { router };
