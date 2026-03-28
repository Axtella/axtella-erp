import { IsOptional, IsString } from 'class-validator';

export class CreateHotelHousekeepingTaskDto {
  @IsString()
  customerId: string;

  @IsString()
  propertyId: string;

  @IsString()
  roomId: string;

  @IsOptional()
  @IsString()
  taskType?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsString()
  scheduledFor?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
