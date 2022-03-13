import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function mongooseAtlasConnect() {
  try {
    mongoose.connect(`${process.env.MONGODB_ATLAS_URI}`);
    console.log('\Connection to mongoDB ATLAS successful!!!');
  } catch (err) {
    console.log(`\nError in DB connection: ${err.message} \n`);
  }
}

export default mongooseAtlasConnect;
