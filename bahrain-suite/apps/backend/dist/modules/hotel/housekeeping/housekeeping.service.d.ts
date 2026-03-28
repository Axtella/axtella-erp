import { Repository } from 'typeorm';
import { CreateHotelHousekeepingTaskDto } from './dto/create-hotel-housekeeping-task.dto';
import { FindHotelHousekeepingTasksDto } from './dto/find-hotel-housekeeping-tasks.dto';
import { UpdateHotelHousekeepingTaskDto } from './dto/update-hotel-housekeeping-task.dto';
import { HotelHousekeepingTask } from './entities/hotel-housekeeping-task.entity';
export declare class HotelHousekeepingService {
    private readonly repo;
    constructor(repo: Repository<HotelHousekeepingTask>);
    create(dto: CreateHotelHousekeepingTaskDto, tenantId?: string): Promise<HotelHousekeepingTask>;
    findAll(query: FindHotelHousekeepingTasksDto, tenantId?: string): Promise<{
        items: HotelHousekeepingTask[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, tenantId?: string): Promise<HotelHousekeepingTask>;
    update(id: string, dto: UpdateHotelHousekeepingTaskDto, tenantId?: string): Promise<HotelHousekeepingTask>;
}
