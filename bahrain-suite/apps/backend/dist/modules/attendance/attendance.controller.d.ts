import { AttendanceService } from './attendance.service';
import { CreateAttendanceRecordDto } from './dto/create-attendance-record.dto';
import { FindAttendanceDto } from './dto/find-attendance.dto';
export declare class AttendanceController {
    private readonly service;
    constructor(service: AttendanceService);
    list(query: FindAttendanceDto): Promise<{
        items: import("./entities/attendance-record.entity").AttendanceRecord[];
        total: number;
    }>;
    create(dto: CreateAttendanceRecordDto): Promise<import("./entities/attendance-record.entity").AttendanceRecord>;
}
