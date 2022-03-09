import { Request, Response } from 'express';
import { createSessionService } from '../services/session.service';
import { validatePasswordService } from '../services/user.service';

export const createSessionControllerHandler = async (req: Request, res: Response) => {
  // validate the user's password
  const user = await validatePasswordService(req.body);

  if (!user) {
    return res.status(401).json({
      error: {
        message: 'Invalid email or password'
      }
    });
  }

  // create a session
  const session = await createSessionService(user._id, req.get('user-agent') || '');
}