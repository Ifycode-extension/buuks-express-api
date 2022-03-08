import mongoose from 'mongoose';

export interface BookDocument extends mongoose.Document {
  name: string;
  age: number;
}

const collectionName = 'book';

const BookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true }
});

const BookModel = mongoose.model(collectionName, BookSchema, collectionName); //declare collection name a second time to prevent mongoose from pluralizing or adding 's' to the collection name

export { BookModel };
