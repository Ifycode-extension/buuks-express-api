import {
  NextFunction,
  Request,
  Response
} from 'express';
import {
  getDemoItems,
  createDemoItem,
  getOneDemoItem
} from '../services/demo.service';

let routeName = 'demo';
let item = `${routeName}-item`;

export const getDemoItemsHandler = async (req: Request, res: Response) => {
  try {
    let doc = await getDemoItems();
    // TODO: Format doc to the desired response shape
    res.status(200).json(doc);
    return doc;
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