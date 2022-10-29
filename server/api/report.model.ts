import { IsString } from 'class-validator';

export interface Report {
    title: string;
    phoneNumber: string;
    country: string;
}

export class MakeReportDTO {
    @IsString()
    title: string;

    @IsString()
    phoneNumber: string;

    constructor({
        title,
        phoneNumber,
    }: {
        title: string;
        phoneNumber: string;
    }) {
        this.title = title.trim();
        this.phoneNumber = phoneNumber.trim();
    }
}
