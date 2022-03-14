import mongooseAtlasConnect from './dbatlas.connect';
import { app as app } from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    console.log(`\nServer running at ${process.env.API_HOST_URL}`);
    await mongooseAtlasConnect();
  } catch (err) {
    console.log(err);
  }
});

// Chalk import and usage is what causes the import error
// Also had to use node v16 (was using v14 before - not sure if this is a cause of the issue though...)