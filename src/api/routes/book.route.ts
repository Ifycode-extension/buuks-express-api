import express, { IRouter } from 'express';
import { createBookSchema, getOneBookSchema } from '../../middleware/schema/book.schema';
import validateResource from '../../middleware/validate';
import {
  getBooksHandler,
  createBookController,
  getOneBookController,
  deleteBookHandler
} from '../controllers/book.controller';

let router: IRouter = express.Router();

router.get('/', getBooksHandler);
router.post('/', validateResource(createBookSchema), createBookController);
router.get('/:bookId', validateResource(getOneBookSchema), getOneBookController);
router.delete('/:bookId', deleteBookHandler);

export { router };
