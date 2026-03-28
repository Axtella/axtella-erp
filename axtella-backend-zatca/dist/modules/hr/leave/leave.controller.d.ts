import { LeaveService } from './leave.service';
export declare class LeaveController {
    private readonly service;
    constructor(service: LeaveService);
    findAll(): {
        module: string;
        items: any[];
    };
}
