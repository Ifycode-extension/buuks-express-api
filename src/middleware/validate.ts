import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log("Validate this  request body: ",  req.body)
    // console.log("Validate this file: ", req.file)
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
      file: req.file
    });
    next();
  } catch (err: any) {
    console.log('req error: ', req.body);
    return res.status(400).send(err.errors);
  }
}

export default validateResource;

// TODO: reformat the function returning a function so that it looks a bit different
// TODO: Is it possiible to use .json() instead of .send() in the catch block?