import { Repository } from 'typeorm';
import { AttendanceRecord } from './entities/attendance-record.entity';
import { CreateAttendanceRecordDto } from './dto/create-attendance-record.dto';
import { FindAttendanceDto } from './dto/find-attendance.dto';
export declare class AttendanceService {
    private readonly repo;
    constructor(repo: Repository<AttendanceRecord>);
    create(dto: CreateAttendanceRecordDto): Promise<AttendanceRecord>;
    findAll(query: FindAttendanceDto): Promise<{
        items: AttendanceRecord[];
        total: number;
    }>;
}
