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

let routeName = 'book';
let item = `${routeName}-item`;

export const getBooksHandler = async (req: Request, res: Response) => {
  try {
    let docs = await getBooks();
    const response = {
      count: docs.length,
      items: docs.map(doc => {
        return {
          _id: doc._id,
          title: doc.title,
          description: doc.description,
          request: {
            type: 'GET',
            url: `http://localhost:3000/${routeName}/${doc._id}`
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
      message: `${item} created successfully!`,
      newItem: {
        _id: doc._id,
        title: doc.title,
        description: doc.description,
        request: {
          type: 'GET',
          url: `http://localhost:3000/${routeName}/${doc._id}`
        }
      }
    });
    return doc;
  } catch (err) {
    res.status(500).json({
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
          description: `Url link to all ${item}s`,
          url: `http://localhost:3000/${routeName}/`
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
      message: `${item} deleted successfully!`,
      request: {
        type: 'POST',
        description: 'Url link to make post request to',
        url: `http://localhost:3000/${item}/`,
        body: {
          title: 'String',
          description: 'Number'
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      message: `Error deleting ${item}`,
      error: `${err}`
    });
  }
}