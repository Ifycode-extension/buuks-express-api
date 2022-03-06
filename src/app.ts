import express, { Express } from 'express';
import { router as appController } from './api/routes/appRoute';

const app: Express = express();

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
