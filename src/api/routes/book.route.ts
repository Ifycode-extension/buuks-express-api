import express, { IRouter } from 'express';
import { multerUploadsMiddleware } from '../../middleware/multer';
import {
  createBookSchema,
  deleteBookSchema,
  getOneBookSchema,
  uploadBookSchema
} from '../../middleware/schema/book.schema';
import validateResource from '../../middleware/validate';
import {
  getBooksController,
  createBookController,
  getOneBookController,
  deleteBookController
} from '../controllers/book.controller';

let router: IRouter = express.Router();

router.get('/', getBooksController);

router.post('/',
  multerUploadsMiddleware,
  validateResource(createBookSchema),
  validateResource(uploadBookSchema),
  createBookController
);
router.get('/:bookId', validateResource(getOneBookSchema), getOneBookController);
router.delete('/:bookId', validateResource(deleteBookSchema), deleteBookController);

export { router };
