import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/http.errors';

const errorMiddleware = (
    err: HttpError,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    const status = err.status;
    const message = err.message;

    res.status(status).send({
        status,
        message,
    });
};

export default errorMiddleware;
