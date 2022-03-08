import { Request, Response } from 'express';
import { createUserService } from '../services/user.service';

export const createUserControllerHandler = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);
    return user;
  } catch (err) {
    return res.status(500).json({
      error: `${err}`
    });
  }
}