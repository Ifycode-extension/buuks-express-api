import express, { IRouter } from 'express';
import { createBookSchema } from '../../middleware/schema/book.schema';
import validateResource from '../../middleware/validate';
import {
  getBooksHandler,
  createBookController,
  getOneBookHandler,
  deleteBookHandler
} from '../controllers/book.controller';

let router: IRouter = express.Router();

router.get('/', getBooksHandler);
router.post('/', validateResource(createBookSchema), createBookController);
router.get('/:bookId', getOneBookHandler);
router.delete('/:bookId', deleteBookHandler);

export { router };
