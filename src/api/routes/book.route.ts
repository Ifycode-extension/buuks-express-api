import express, { IRouter } from 'express';
import { createBookSchema, deleteBookSchema, getOneBookSchema } from '../../middleware/schema/book.schema';
import validateResource from '../../middleware/validate';
import {
  createBookController,
  getOneBookController,
  deleteBookController,
  getBooksForEachUserController
} from '../controllers/book.controller';

let router: IRouter = express.Router();

router.post('/', validateResource(createBookSchema), createBookController);
router.get('/user/:userId', getBooksForEachUserController);
router.get('/:bookId', validateResource(getOneBookSchema), getOneBookController);
router.delete('/:bookId', validateResource(deleteBookSchema), deleteBookController);

export { router };
