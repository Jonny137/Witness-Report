import { Application } from 'express';
import reportRouter from './api/report.router';

export default (app: Application): void => {
    app.use('/report', reportRouter);
};
