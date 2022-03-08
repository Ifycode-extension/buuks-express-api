import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    });
    next();
  } catch (err: any) {
    return res.status(400).send(err.errors);
  }
}

export default validateResource;

// TODO: reformat the function returning a function so that it looks a bit different
// TODO: Is it possiible to use .json() instead of .send() in the catch block?