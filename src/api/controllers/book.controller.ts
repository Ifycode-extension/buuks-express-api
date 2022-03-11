import {
  NextFunction,
  Request,
  Response
} from 'express';
import {
  getBooks,
  createBookService,
  getOneBookService,
  deleteBook
} from '../services/book.service';
import dotenv from 'dotenv';
import { CreateBookInput, GetOneBookInput } from '../../middleware/schema/book.schema';

dotenv.config();

let bookItem: string = 'book';
let routeName: string = `${bookItem}s`;

export const getBooksHandler = async (req: Request, res: Response) => {
  try {
    let docs = await getBooks();
    const response = {
      count: docs.length,
      books: docs.map(doc => {
        return {
          _id: doc._id,
          title: doc.title,
          description: doc.description,
          request: {
            type: 'GET',
            url: `${process.env.LOCALHOST_URL}/${routeName}/${doc._id}`
          }
        }
      })
    };
    res.status(200).json(response);
    return response;
  } catch (err) {
    res.status(500).json({
      error: `${err}`
    });
  }
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
    const bookId = req.params.bookId;
    const doc = await getOneBookService({ bookId });
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

export const deleteBookHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let doc = await deleteBook(req.params.bookId);
    res.status(200).json({
      message: `${bookItem} deleted successfully!`,
      request: {
        type: 'POST',
        description: 'Url link to make post request to',
        url: `${process.env.LOCALHOST_URL}/${routeName}/`,
        body: {
          title: 'String',
          description: 'String'
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      message: `Error deleting ${bookItem}`,
      error: `${err}`
    });
  }
}