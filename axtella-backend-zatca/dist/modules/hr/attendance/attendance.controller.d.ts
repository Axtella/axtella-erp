import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private readonly service;
    constructor(service: AttendanceService);
    findAll(): {
        module: string;
        items: any[];
    };
}
