import { FilterQuery } from 'mongoose';
import { SessionDocument, SessionModel } from '../models/session.model';

export const createSessionService = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({
    user: userId,
    userAgent
  });

  return session.toJSON();
}

// find sessions
export const getUserSessionsService = async (query: FilterQuery<SessionDocument>) => {
  console.log('Query: ', query);
  return await SessionModel.find(query).lean();
}