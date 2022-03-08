import {
  NextFunction,
  Request,
  Response
} from 'express';
import {
  getBooks,
  createBook,
  getOneBook,
  deleteBook
} from '../services/book.service';
import dotenv from 'dotenv';

dotenv.config();

let book: string = 'book';
let routeName: string = `${book}s`;

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

export const createBookHandler = async (req: Request, res: Response) => {
  try {
    let doc = await createBook(req.body);
    res.status(201).json({
      message: `${book} created successfully!`,
      book: {
        _id: doc._id,
        title: doc.title,
        description: doc.description,
        request: {
          type: 'GET',
          url: `${process.env.LOCALHOST_URL}/${routeName}/${doc._id}`
        }
      }
    });
    return doc;
  } catch (err) {
    res.status(409).json({
      error: `${err}`
    });
  }
}

export const getOneBookHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let doc = await getOneBook(req.params.bookId);
    if (doc) {
      res.status(200).json({
        _id: doc._id,
        title: doc.title,
        description: doc.description,
        request: {
          type: 'GET',
          description: `Url link to all ${book}s`,
          url: `${process.env.LOCALHOST_URL}/${routeName}/`
        }
      });
      return doc;
    } else {
      return res.status(404).json({
        message: 'No record found for provided ID'
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Invalid ID',
      error: `${err}`
    });
  }
}

export const deleteBookHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let doc = await deleteBook(req.params.bookId);
    res.status(200).json({
      message: `${book} deleted successfully!`,
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
      message: `Error deleting ${book}`,
      error: `${err}`
    });
  }
}