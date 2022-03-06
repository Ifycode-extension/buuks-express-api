import mongooseConnect from './db';
import { app as app } from './app';
//import chalk from 'chalk';

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    console.log(`\nServer running at http://localhost:${port}`);
    await mongooseConnect();
    //console.log(chalk.cyanBright(`\nServer running at http://localhost:${port}`));
  } catch (err) {
    console.log(err);
  }
});

// Chalk import is what causes the import error
// Also had to use node v16 (was using v14 before - not sure if this is a cause of the issue though...)