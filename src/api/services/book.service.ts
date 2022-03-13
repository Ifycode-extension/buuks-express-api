import { DocumentDefinition, FilterQuery, QueryOptions } from 'mongoose';
import { BookDocument, BookModel as Book } from '../models/book.model';
import { UserDocument, UserModel as User } from '../models/user.model';

export const getBooksService = async (filter: Record<string, any>) => {
  const query = await Book.find(filter);
  return query;
}

export const getUserByIdService = async (query: FilterQuery<UserDocument>, options: QueryOptions = { lean: true }) => {
  const finduserbyid = User.findById(query, {}, options);
  return finduserbyid;
}

export const createBookService = async (input: DocumentDefinition<Omit<BookDocument, 'createdAt' | 'updatedAt'>>) => {
  const save = Book.create(input);
  return save;
}

export const getOneBookService = async (query: FilterQuery<BookDocument>, options: QueryOptions = { lean: true }) => {
  const findbyid = Book.findById(query, {}, options);
  return findbyid;
}

export const deleteBookService = async (query: FilterQuery<BookDocument>) => {
  const deleteone = await Book.findByIdAndDelete(query);
  return deleteone;
}