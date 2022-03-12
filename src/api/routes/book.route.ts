import express, { IRouter } from 'express';
import multer from 'multer';
import { multerUploadsMiddleware } from '../../middleware/multer';
import { createBookSchema, deleteBookSchema, getOneBookSchema } from '../../middleware/schema/book.schema';
import validateResource from '../../middleware/validate';
import {
  getBooksController,
  createBookController,
  getOneBookController,
  deleteBookController
} from '../controllers/book.controller';

let router: IRouter = express.Router();
const upload = multer();

router.get('/', getBooksController);

router.post('/',
  multerUploadsMiddleware,
  validateResource(createBookSchema), //upload.any(), // (just testing with .any() in case it works)
  createBookController
);
router.get('/:bookId', validateResource(getOneBookSchema), getOneBookController);
router.delete('/:bookId', validateResource(deleteBookSchema), deleteBookController);

export { router };


// test upload to cloudinary with this any time POST /books fails again
// router.post('/file',
//   multerUploadsMiddleware,
//   createBookController
// );
