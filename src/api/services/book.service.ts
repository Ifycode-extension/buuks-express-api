import { DocumentDefinition } from 'mongoose';
import { BookDocument, BookModel as Book } from '../models/book.model';

export const getBooks = async () => {
  const query = await Book.find().select('_id title description').exec();
  return query;
}

export const createBookService = async (input: DocumentDefinition<Omit<BookDocument, 'createdAt' | 'updatedAt'>>) => {
  const save = Book.create(input);
  return save;
}

export const getOneBook = async (paramsId: string) => {
  const query = Book.findById(paramsId).select('_id title description').exec();
  return query;
}

export const deleteBook = async (paramsId: string) => {
  const query = await Book.deleteOne({ _id: paramsId }).exec();
  return query;
}