import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelHousekeepingTaskDto } from './create-hotel-housekeeping-task.dto';

export class UpdateHotelHousekeepingTaskDto extends PartialType(CreateHotelHousekeepingTaskDto) {}
