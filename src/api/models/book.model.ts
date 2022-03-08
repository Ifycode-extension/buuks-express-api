import mongoose from 'mongoose';

export interface BookDocument extends mongoose.Document {
  title: string;
  description: string;
}

const collectionName = 'book';

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const BookModel = mongoose.model(collectionName, BookSchema, collectionName); //declare collection name a second time to prevent mongoose from pluralizing or adding 's' to the collection name

export { BookModel };
