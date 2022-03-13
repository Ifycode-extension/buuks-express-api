import { Request, Response } from 'express';

export const getAppController = async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'App works!'
  });
}
