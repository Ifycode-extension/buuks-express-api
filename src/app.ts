import express, { Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { router as appController } from './api/routes/appRoute';

dotenv.config();

const app: Express = express();

app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(cors({ origin: `http://localhost:${process.env.CLIENT_PORT}` }));

app.use('/', appController);

export { app };






// import express from 'express';
// //import routes from './api/routes';

// const app = express();

// //routes(app);

// //appUse(main, ) {
//   app.use('/test', );
// //}

// export { app };
