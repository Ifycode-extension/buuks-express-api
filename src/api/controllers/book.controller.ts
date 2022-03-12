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
  getUserByIdService
} from '../services/book.service';
import dotenv from 'dotenv';
import { CreateBookInput, DeleteBookInput, GetOneBookInput } from '../../middleware/schema/book.schema';

dotenv.config();

let bookItem: string = 'book';
let routeName: string = `${bookItem}s`;

export const getBooksForEachUserController = async (req: Request, res: Response, next: NextFunction) => {

  try {
    return res.status(200).json(await getBooksService({ user: req.params.userId }));
  } catch (err) {
    return res.status(404).json({
      message: 'No user record found for provided ID'
    });
  }

  // try {
  //   const userId = new mongoose.Types.ObjectId(req.params.userId);
  //   const user = await getUserByIdService(userId);

  //   if (user) {
  //     console.log('user: ', user._id.toString());
  //     const docs = (await getBooksService())
  //       .filter(doc => {
  //         return doc.user.toString() === user._id.toString();
  //       });
  //     const response = {
  //       count: docs.length,
  //       description: `Books created by ${user.name}`,
  //       books: docs.map(doc => {
  //         return {
  //           _id: doc._id,
  //           title: doc.title,
  //           description: doc.description,
  //           pdf: doc.pdf,
  //           request: {
  //             type: 'GET',
  //             url: `${process.env.LOCALHOST_URL}/${routeName}/${doc._id}`
  //           }
  //         }
  //       })
  //     }
  //     res.status(200).json(response);
  //   } else {
  //     return res.status(404).json({
  //       message: 'No user record found for provided ID'
  //     });
  //   }
  // } catch (err) {
  //   return res.status(500).json({
  //     message: 'Invalid user ID',
  //     error: `${err}`
  //   });
  // }
}

export const createBookController = async (req: Request<{}, {}, CreateBookInput['body']>, res: Response) => {
  try {
    const userId = res.locals.user._id;
    const body = req.body;
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
          description: 'Get this single product by ID at the above url'
        }
      }
    });
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
      return res.sendStatus(403);
    }

    await deleteBookService(bookId);

    res.status(200).json({
      message: `${bookItem} deleted successfully!`,
      request: {
        type: 'POST',
        url: `${process.env.LOCALHOST_URL}/${routeName}`,
        description: 'Create a new product at the above url'
      }
    });
  } catch (err) {
    res.status(500).json({
      message: `Error deleting ${bookItem}`,
      error: `${err}`
    });
  }
}