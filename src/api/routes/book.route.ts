import express, { IRouter } from 'express';
import {
  getBooksHandler,
  createBookHandler,
  getOneBookHandler,
  deleteBookHandler
} from '../controllers/book.controller';

let router: IRouter = express.Router();

router.get('/', getBooksHandler);
router.post('/', createBookHandler);
router.get('/:bookId', getOneBookHandler);
router.delete('/:bookId', deleteBookHandler);

export { router };
