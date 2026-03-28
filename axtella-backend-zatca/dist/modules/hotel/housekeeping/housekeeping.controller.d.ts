import { HousekeepingService } from './housekeeping.service';
export declare class HousekeepingController {
    private readonly service;
    constructor(service: HousekeepingService);
    findAll(): {
        module: string;
        items: any[];
    };
}
