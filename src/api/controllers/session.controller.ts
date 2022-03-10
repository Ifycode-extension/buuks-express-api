import { Request, Response } from 'express';
import { signJwt } from '../../utils/jwt.utils';
import {
  createSessionService,
  getUserSessionsService,
  updateUserSessionService
} from '../services/session.service';
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

  try {
    // create an access token
    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: `${process.env.ACCESSTOKEN_TTL}` } // will live for the duration of e.g. minutes specified in the .env file
    );

    // create an refresh token
    const refreshToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: `${process.env.REFRESHTOKEN_TTL}` } // will live for the duration of e.g. year specified in the .env file
    );

    //return access and refresh token
    return res.status(200).json({
      accessToken,
      refreshToken
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}

export const getUserSessionsControllerHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  // console.log('userId: ', userId);
  const sessions = await getUserSessionsService({ user: userId, valid: true });
  // console.log('Sessions: ', sessions);
  return res.status(200).json(sessions);
}

export const deleteUserSessionControllerHandler = async (req: Request, res: Response) => {

  const sessionId = res.locals.user.session;

  // set valid (for a session) to false so that user is not able to reuse that session
  const test = await updateUserSessionService({ _id: sessionId }, { valid: false });

  return res.status(200).json({
    accessToken: null,
    refreshToken: null,
  });
}
