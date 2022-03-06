import express from 'express';
import routes from './api/routes';

const app = express();

routes(app);


export { app };
