import { Request, Response } from 'express';

export const getAppController = async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Buuks API!',
    readme: 'See readme at https://github.com/Ifycode/buuks-express-api for how buuks API works'
  });
}
