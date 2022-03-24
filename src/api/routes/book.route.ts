import express, { IRouter } from 'express';
import { multerUploadsMiddleware } from '../../middleware/multer';
import requireUser from '../../middleware/requireUser';
import {
  createBookSchema,
  deleteBookSchema,
  getOneBookSchema,
  uploadBookSchema
} from '../../middleware/schema/book.schema';
import validateResource from '../../middleware/validate';
import {
  createBookController,
  getOneBookController,
  deleteBookController,
  getBooksForEachUserController,
  updateBookController
} from '../controllers/book.controller';

let router: IRouter = express.Router();

router.post('/',
  requireUser,
  multerUploadsMiddleware,
  validateResource(createBookSchema),
  validateResource(uploadBookSchema),
  createBookController
);
router.get('/user/:userId', requireUser, getBooksForEachUserController);
router.get('/:bookId', validateResource(getOneBookSchema), getOneBookController);
router.put('/:bookId',
  requireUser,
  multerUploadsMiddleware,
  updateBookController
);
router.delete('/:bookId',
  requireUser,
  validateResource(deleteBookSchema),
  deleteBookController
);

export { router };
