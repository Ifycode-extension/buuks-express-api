import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface BookDocument extends mongoose.Document {
  user: UserDocument['_id'];
  title: string;
  description: string;
  pdf: string;
  createdAt: Date;
  updatedAt: Date;
}

const collectionName = 'book';

const BookSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    pdf: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const BookModel = mongoose.model<BookDocument>(collectionName, BookSchema, collectionName); //declare collection name a second time to prevent mongoose from pluralizing or adding 's' to the collection name

export { BookModel };
