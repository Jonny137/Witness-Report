import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';

import { MakeReportDTO } from './report.model';
import reportService from './report.service';
import logger from '../logger';
import HttpError from '../errors/http.errors';

export const makeReport = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const makeReportDto = new MakeReportDTO(req.body);
        const validationError = await validate(makeReportDto);

        if (!!validationError.length) {
            return next(new HttpError(422, 'Request body is invalid.'));
        }

        const responseData = await reportService.report(makeReportDto);

        res.json(responseData);
    } catch (error: any) {
        logger.error('Error during report creation: ', error);
        next(new HttpError(error.status, error.message));
    }
};
