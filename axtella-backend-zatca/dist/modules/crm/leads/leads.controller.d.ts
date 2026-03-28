import { LeadsService } from './leads.service';
export declare class LeadsController {
    private readonly service;
    constructor(service: LeadsService);
    findAll(): {
        module: string;
        items: any[];
    };
}
