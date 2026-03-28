import { ShiftsService } from './shifts.service';
export declare class ShiftsController {
    private readonly service;
    constructor(service: ShiftsService);
    findAll(): {
        module: string;
        items: any[];
    };
}
