import {
  NextFunction,
  Request,
  Response
} from 'express';
import {
  getDemoItems,
  createDemoItem,
  getOneDemoItem,
  deleteDemoItem
} from '../services/demo.service';

let routeName = 'demo';
let item = `${routeName}-item`;

export const getDemoItemsHandler = async (req: Request, res: Response) => {
  try {
    let docs = await getDemoItems();
    const response = {
      count: docs.length,
      items: docs.map(doc => {
        return {
          _id: doc._id,
          name: doc.name,
          age: doc.age,
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

export const createDemoItemHandler = async (req: Request, res: Response) => {
  try {
    let doc = await createDemoItem(req.body);
    res.status(201).json({
      message: `${item} created successfully!`,
      newItem: {
        _id: doc._id,
        name: doc.name,
        age: doc.age,
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

export const getOneDemoItemHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let doc = await getOneDemoItem(req.params.demoId);
    if (doc) {
      res.status(200).json({
        _id: doc._id,
        name: doc.name,
        age: doc.age,
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

export const deleteDemoItemHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let doc = await deleteDemoItem(req.params.demoId);
    res.status(200).json({
      message: `${item} deleted successfully!`,
      request: {
        type: 'POST',
        description: 'Url link to make post request to',
        url: `http://localhost:3000/${item}/`,
        body: {
          name: 'String',
          age: 'Number'
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