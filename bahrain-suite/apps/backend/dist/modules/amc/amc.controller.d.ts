import { AmcService } from './amc.service';
export declare class AmcController {
    private readonly service;
    constructor(service: AmcService);
    findAll(): {
        module: string;
        items: any[];
    };
}
