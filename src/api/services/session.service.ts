import { SessionModel } from '../models/session.model';


export const createSessionService = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({
    user: userId,
    userAgent
  });

  return session;
}