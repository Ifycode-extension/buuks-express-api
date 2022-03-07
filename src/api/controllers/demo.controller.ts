import { Request, Response } from 'express';
import { getDemoItems } from '../services/demo.service';

// let routeName = 'demo';
// let item = `${routeName}-item`;

export const getDemoItemsHandler = async (req: Request, res: Response) => {
  try {
    let doc = await getDemoItems();
    // TODO: Format doc to to desired response shape.
    res.status(200).json(doc);
    return doc;
  } catch (err) {
    res.status(500).json({
      error: `${err}`
    });
  }
}