import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const collectionName = 'user';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model(collectionName, UserSchema, collectionName); //declare collection name a second time to prevent mongoose from pluralizing or adding 's' to the collection name

export { UserModel };
