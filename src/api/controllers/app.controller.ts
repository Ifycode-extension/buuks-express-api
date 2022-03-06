import { Request, Response } from 'express';

export const getAppHandler = async (req: Request, res: Response) => {
  // console.log(req.body);
  res.status(200).json({
    message: 'App works!'
  });
}