import { DocumentDefinition, FilterQuery, QueryOptions } from 'mongoose';
import { BookDocument, BookModel as Book } from '../models/book.model';

export const getBooks = async () => {
  const query = await Book.find().select('_id title description').exec();
  return query;
}

export const createBookService = async (input: DocumentDefinition<Omit<BookDocument, 'createdAt' | 'updatedAt'>>) => {
  const save = Book.create(input);
  return save;
}

export const getOneBookService = async (query: FilterQuery<BookDocument>, options: QueryOptions = { lean: true }) => {
  const findone = Book.findOne(query, {}, options);
  return findone;
}

export const deleteBook = async (paramsId: string) => {
  const query = await Book.deleteOne({ _id: paramsId }).exec();
  return query;
}