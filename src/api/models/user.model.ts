import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

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

// Turn .env value into javascript string before applying parseInt to turn it into a number
let saltWorkFactor: number = parseInt(`${process.env.SALT_WORK_FACTOR}`, 10);

// Pre save hook for password hashing and salting
UserSchema.pre('save', async function (next) {
  let user = this as UserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(saltWorkFactor);
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

// Compare password provided (when user logins in) with the hash
UserSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(enteredPassword, user.password).catch((err) => false);
}

const UserModel = mongoose.model<UserDocument>(collectionName, UserSchema, collectionName); //declare collection name a second time to prevent mongoose from pluralizing or adding 's' to the collection name

export { UserModel };
