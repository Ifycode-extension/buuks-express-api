import mongoose from 'mongoose';
import {
  NextFunction,
  Request,
  Response
} from 'express';
import {
  getBooksService,
  createBookService,
  getOneBookService,
  deleteBookService,
  getUserByIdService,
  updateBookservice
} from '../services/book.service';
import dotenv from 'dotenv';
import {
  CreateBookInput,
  DeleteBookInput,
  GetOneBookInput,
  UpdateBookInput,
  UploadBookInput
} from '../../middleware/schema/book.schema';
import { dataUri } from '../../middleware/multer';
import { uploader } from '../../config/cloudinary';

dotenv.config();

let bookItem: string = 'book';
let routeName: string = `${bookItem}s`;

export const getBooksForEachUserController = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    const user = await getUserByIdService(userId);

    if (user) {
      const docs = await getBooksService({ user: req.params.userId });
      return res.status(200).json({
        count: docs.length,
        description: `List of books uploaded by user: ${req.params.userId}`,
        books: docs.map(doc => {
          return {
            _id: doc._id,
            title: doc.title,
            description: doc.description,
            pdf: doc.pdf,
            request: {
              type: 'GET',
              url: `${process.env.LOCALHOST_URL}/${routeName}/${doc._id}`,
              description: `Get this single ${bookItem} by ID at the above url`
            }
          }
        })
      });
    } else {
      return res.status(404).json({
        message: 'No user record found for provided ID'
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Invalid user ID',
      error: `${err}`
    });
  }
}

export const createBookController = async (req: Request<CreateBookInput['body'], UploadBookInput['file']>, res: Response) => {
  try {
    const userId = res.locals.user._id;

    // TODO: extract this cloudinary upload code to a separate service
    if (req.file) {
      // console.log('file: ', req.file);
      const file = dataUri(req).content as string;
      // console.log(file)
      return uploader.upload(file).then(async (result) => {
        // console.log(result)
        const pdf = result.url;
        const body = { pdf, ...req.body };
        // console.log('body: ', body);
        //-----------------------------------------------------
        const doc = await createBookService({ ...body, user: userId });
        return res.status(201).json({
          message: `New ${bookItem} created successfully!`,
          book: {
            _id: doc._id,
            title: doc.title,
            description: doc.description,
            pdf: doc.pdf,
            user: doc.user,
            request: {
              type: 'GET',
              url: `${process.env.LOCALHOST_URL}/${routeName}/${doc._id}`,
              description: `Get this single ${bookItem} by ID at the above url`
            }
          }
        });
        //-----------------------------------------------------
      }).catch((err) => res.status(400).json({
        message: 'something went wrong while processing your request',
        data: {
          err
        }
      }));
    }
  } catch (err) {
    res.status(409).json({
      error: `${err}`
    });
  }
}

export const getOneBookController = async (req: Request<GetOneBookInput['params']>, res: Response, next: NextFunction) => {
  try {
    const bookId = new mongoose.Types.ObjectId(req.params.bookId);
    const doc = await getOneBookService(bookId);
    if (doc) {
      return res.status(200).json({
        _id: doc._id,
        title: doc.title,
        description: doc.description,
        pdf: doc.pdf,
        user: doc.user,
        request: {
          type: 'GET',
          url: `${process.env.LOCALHOST_URL}/${routeName}`,
          description: `Get the list of all ${bookItem}s for this user at the above url`,
        }
      });
    } else {
      return res.status(404).json({
        message: 'No record found for provided ID'
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Invalid ID',
      error: `${err}`
    });
  }
}

export const updateBookController = async (req: Request<UpdateBookInput['params'], UploadBookInput['file']>, res: Response) => {
  try {
    const userId = res.locals.user._id;
    const bookId = new mongoose.Types.ObjectId(req.params.bookId);
    const book = await getOneBookService(bookId);

    if (!book) {
      return res.status(404).json({
        message: 'No record found for provided ID'
      });
    }

    if (book.user.toString() !== userId) {
      return res.status(403).json({
        error: 'Forbidden'
      });
    }

    await updateBookservice(bookId, req.body, { new: true });

    res.status(200).json({
      message: `${bookItem} updated successfully!`,
      request: {
        type: 'GET',
        url: `${process.env.LOCALHOST_URL}/${routeName}/${bookId.toString()}`,
        description: `Get this single ${bookItem} by ID at the above url`
      }
    });
  } catch (err) {
    res.status(500).json({
      message: `Error updating ${bookItem}`,
      error: `${err}`
    });
  }
}

export const deleteBookController = async (req: Request<DeleteBookInput['params']>, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.user._id;
    const bookId = new mongoose.Types.ObjectId(req.params.bookId);
    const book = await getOneBookService(bookId);

    if (!book) {
      return res.status(404).json({
        message: 'No record found for provided ID'
      });
    }

    if (book.user.toString() !== userId) {
      return res.status(403).json({
        error: 'Forbidden'
      });
    }

    await deleteBookService(bookId);

    res.status(200).json({
      message: `${bookItem} deleted successfully!`,
      request: {
        type: 'POST',
        url: `${process.env.LOCALHOST_URL}/${routeName}`,
        description: `Create a new ${bookItem} at the above url`
      }
    });
  } catch (err) {
    res.status(500).json({
      message: `Error deleting ${bookItem}`,
      error: `${err}`
    });
  }
}