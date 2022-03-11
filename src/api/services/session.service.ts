import { get } from 'lodash';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { signJwt, verifyJwt } from '../../utils/jwt.utils';
import { SessionDocument, SessionModel } from '../models/session.model';
import { findUserService } from './user.service';

export const createSessionService = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({
    user: userId,
    userAgent
  });

  return session.toJSON();
}

// find sessions
export const getUserSessionsService = async (query: FilterQuery<SessionDocument>) => {
  return await SessionModel.find(query).lean();
}

// (used inside delete controller)
export const updateUserSessionService = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => {
  //deleteOne works instead of updateOne
  return SessionModel.deleteOne(query, update);
}

// used inside deserializeUser file
export const reIssueAccessToken = async ({ refreshToken }: { refreshToken: string }) => {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, 'session')) return false;

  const session = await SessionModel.findById(get(decoded, 'session'));

  // if (!session || !session.valid) return false; (removing !session.valid from the if statement fixed the issue)
  if (!session) return false;

  const user = await findUserService({ _id: session.user });

  if (!user) return false;

  // create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: `${process.env.ACCESSTOKEN_TTL}` } // will live for the duration of e.g. minutes specified in the .env file
  );

  return accessToken;
}