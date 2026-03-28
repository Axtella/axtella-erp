import { GuestsService } from './guests.service';
export declare class GuestsController {
    private readonly service;
    constructor(service: GuestsService);
    findAll(): {
        module: string;
        items: any[];
    };
}
