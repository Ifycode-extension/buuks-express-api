import { DocumentDefinition } from 'mongoose';
import { UserDocument, UserModel } from '../models/user.model';

export const createUserService = async (input: DocumentDefinition<UserDocument>) => {
  const query = await UserModel.create(input);
  return query;
}