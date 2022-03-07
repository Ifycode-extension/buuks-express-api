import express, { IRouter } from 'express';
import {
  getDemoItemsHandler,
  createDemoItemHandler,
  getOneDemoItemHandler,
  deleteDemoItemHandler
} from '../controllers/demo.controller';

let router: IRouter = express.Router();

router.get('/', getDemoItemsHandler);
router.post('/', createDemoItemHandler);
router.get('/:demoId', getOneDemoItemHandler);
router.delete('/:demoId', deleteDemoItemHandler);

export { router };
