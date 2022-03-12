import express, { IRouter } from 'express';
import { createBookSchema, deleteBookSchema, getOneBookSchema } from '../../middleware/schema/book.schema';
import validateResource from '../../middleware/validate';
import {
  getBooksHandler,
  createBookController,
  getOneBookController,
  deleteBookController
} from '../controllers/book.controller';

let router: IRouter = express.Router();

router.get('/', getBooksHandler);
router.post('/', validateResource(createBookSchema), createBookController);
router.get('/:bookId', validateResource(getOneBookSchema), getOneBookController);
router.delete('/:bookId', validateResource(deleteBookSchema), deleteBookController);

export { router };
