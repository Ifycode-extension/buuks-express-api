import { app } from './app';
import chalk from 'chalk';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  try {
    console.log(chalk.cyanBright(`\nServer running at http://localhost:${port}`));
  } catch (err) {
    console.log(err);
  }
});