import { Request, Response } from 'express';
import { omit } from 'lodash';
import { userInfo } from 'os';
import { CreateUserInput } from '../../middleware/schema/user.schema';
import { createUserService } from '../services/user.service';

export const createUserController = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) => {
  try {
    const user = await createUserService(req.body);
    const userWithoutPassword = omit(user.toJSON(), 'password');
    return res.status(201).json({
      user: {
        ...userWithoutPassword
      }
    });
  } catch (err) {
    return res.status(409).json({
      error: `${err}`
    });
  }
}