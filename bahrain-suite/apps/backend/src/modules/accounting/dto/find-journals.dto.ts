import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class FindJournalsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  propertyId?: string;

  @ApiPropertyOptional({ description: 'Inclusive YYYY-MM-DD (daybook from)' })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({ description: 'Inclusive YYYY-MM-DD (daybook to)' })
  @IsOptional()
  @IsDateString()
  to?: string;
}
