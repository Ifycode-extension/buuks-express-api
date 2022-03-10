import { omit } from 'lodash';
import { DocumentDefinition, FilterQuery } from 'mongoose';
import { UserDocument, UserModel } from '../models/user.model';

export const createUserService = async (
  input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>
) => {
  const query = await UserModel.create(input);
  return query;
}

export const validatePasswordService = async ({ email, password }: { email: string; password: string }) => {
  const user = await UserModel.findOne({ email });

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
}

export const findUserService = (query: FilterQuery<UserDocument>) => {
  return UserModel.findOne(query).lean();
}