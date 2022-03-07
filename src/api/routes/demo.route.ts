import express, { IRouter } from 'express';
import {
  getDemoItemsHandler,
  createDemoItemHandler,
  getOneDemoItemHandler
} from '../controllers/demo.controller';

let router: IRouter = express.Router();

router.get('/', getDemoItemsHandler);
router.post('/', createDemoItemHandler);
router.get('/:demoId', getOneDemoItemHandler)

export { router };
