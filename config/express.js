import express from 'express';
import morgan from 'morgan';
import compress from 'compression';
import methodOverride from 'method-override';

import { logs } from './index';
import error from '../src/middlewares/error';
import routes from '../src/routes/v1';

/**
 *
 * Express instance
 * @public
 */
const app = express();

app.use(morgan(logs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compress());
app.use(methodOverride());

app.use('/api/v1', routes);

app.use(error.converter);

app.use(error.notFound);

app.use(error.handler);

export default app;
