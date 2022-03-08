import { DocumentDefinition } from 'mongoose';
import { BookDocument, BookModel as Book } from '../models/book.model';

export const getBooks = async () => {
  const query = await Book.find().select('_id name age').exec();
  return query;
}

export const createBook = async (requestBody: DocumentDefinition<BookDocument>) => {
  let book = new Book({
    name: requestBody.name,
    age: requestBody.age
  });

  const save = await book.save();
  return save;
}

export const getOneBook = async (paramsId: string) => {
  const query = Book.findById(paramsId).select('_id name age').exec();
  return query;
}

export const deleteBook = async (paramsId: string) => {
  const query = await Book.deleteOne({ _id: paramsId }).exec();
  return query;
}