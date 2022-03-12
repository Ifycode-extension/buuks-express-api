import mongoose from 'mongoose';
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
  const findbyid = Book.findById(query, {}, options);
  return findbyid;
}

export const deleteBookService = async (query: FilterQuery<BookDocument>) => {
  const deleteone = await Book.deleteOne(query);
  return deleteone;
}