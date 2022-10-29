import express, { Application } from 'express';
import dotenv from 'dotenv';
dotenv.config({});

import logger from './logger';
import swaggerRoutes from './swagger/index';
import routes from './router';
import errorMiddleware from './middlewares/error.middleware';

const port: number = parseInt(process.env.PORT || '8080', 10);

const app: Application = express();

app.use(express.json());

routes(app);

app.use('/', swaggerRoutes);
app.use(errorMiddleware);

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
}).on('error', (error: any) => {
    logger.error('FATAL ERROR:', error);
    process.exit(-1);
});
