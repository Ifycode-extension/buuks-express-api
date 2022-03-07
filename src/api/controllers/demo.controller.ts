import { Request, Response } from 'express';
import {
  getDemoItems,
  createDemoItem
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