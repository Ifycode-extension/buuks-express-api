import { Request, Response } from 'express';

export const getAppController = async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to Buuks API! Find links to project readme and client below.',
    readme: 'https://github.com/Ifycode/buuks-express-api',
    client: 'https://buuks.netlify.app'
  });
}
