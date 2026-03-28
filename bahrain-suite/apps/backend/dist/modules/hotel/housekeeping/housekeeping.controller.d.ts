import { CreateHotelHousekeepingTaskDto } from './dto/create-hotel-housekeeping-task.dto';
import { FindHotelHousekeepingTasksDto } from './dto/find-hotel-housekeeping-tasks.dto';
import { UpdateHotelHousekeepingTaskDto } from './dto/update-hotel-housekeeping-task.dto';
import { HotelHousekeepingService } from './housekeeping.service';
export declare class HotelHousekeepingController {
    private readonly service;
    constructor(service: HotelHousekeepingService);
    create(dto: CreateHotelHousekeepingTaskDto, tenantId?: string): Promise<import("./entities/hotel-housekeeping-task.entity").HotelHousekeepingTask>;
    findAll(query: FindHotelHousekeepingTasksDto, tenantId?: string): Promise<{
        items: import("./entities/hotel-housekeeping-task.entity").HotelHousekeepingTask[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, tenantId?: string): Promise<import("./entities/hotel-housekeeping-task.entity").HotelHousekeepingTask>;
    update(id: string, dto: UpdateHotelHousekeepingTaskDto, tenantId?: string): Promise<import("./entities/hotel-housekeeping-task.entity").HotelHousekeepingTask>;
}
