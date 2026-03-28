import { JournalsService } from './journals.service';
export declare class JournalsController {
    private readonly service;
    constructor(service: JournalsService);
    findAll(): {
        module: string;
        items: any[];
    };
}
