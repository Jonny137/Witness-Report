import logger from '../logger';
import HttpError from '../errors/http.errors';
import { MakeReportDTO, Report } from './report.model';

import parsePhoneNumber from 'libphonenumber-js';
import { createWriteStream } from 'fs';

const FBI_URL = 'https://api.fbi.gov/wanted/v1/list?title=';
const COUNTRIES_URL = 'https://restcountries.com/v3.1/alpha/';
const STORAGE_PATH = `${__dirname}/../../reports/witness_reports.csv`;

const report = async (makeReportDto: MakeReportDTO): Promise<Report> => {
    const reportData = { ...makeReportDto };

    const wantedResponse = await fetch(`${FBI_URL}${reportData.title}`);
    const wantedData = JSON.parse(await wantedResponse.text());

    if (!wantedData.total) {
        logger.error(`Case title invalid: ${reportData.title}`);
        throw new HttpError(400, 'Invalid case title.');
    }

    const phoneNumber = parsePhoneNumber(reportData.phoneNumber);

    if (!phoneNumber?.isValid()) {
        logger.error(`Phone number invalid: ${reportData.phoneNumber}`);
        throw new HttpError(400, 'Invalid phone number.');
    }

    const witnessCountryNameResponse = await fetch(
        `${COUNTRIES_URL}${phoneNumber.country}`
    );
    const witnessCountryName = JSON.parse(
        await witnessCountryNameResponse.text()
    )?.[0]?.name?.common;

    if (!witnessCountryName) {
        logger.error('Error during parsing country name');
        throw new HttpError(400, 'Invalid country name.');
    }

    const responseData = {
        title: reportData.title,
        phoneNumber: reportData.phoneNumber,
        country: witnessCountryName,
    };

    const writeStream = createWriteStream(STORAGE_PATH, { flags: 'a' });
    writeStream.write(`${Object.values(responseData).join(',')}\n`, (err) => {
        if (err) {
            logger.error('Error during saving report to a file.');
            throw new HttpError(500, 'Error during report saving.');
        }
    });

    return responseData;
};

export default {
    report,
};
