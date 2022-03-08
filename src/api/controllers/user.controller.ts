import { Request, Response } from 'express';
import { omit } from 'lodash';
import { CreateUserInput } from '../../middleware/schema/user.schema';
import { createUserService } from '../services/user.service';

export const createUserControllerHandler = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) => {
  try {
    const user = await createUserService(req.body);
    return res.status(201).json(omit(user.toJSON(), 'password'));
  } catch (err) {
    return res.status(409).json({
      error: `${err}`
    });
  }
}