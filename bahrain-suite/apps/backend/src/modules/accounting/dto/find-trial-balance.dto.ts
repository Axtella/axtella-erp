import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class FindTrialBalanceDto {
  @ApiProperty({ description: 'Inclusive YYYY-MM-DD' })
  @IsDateString()
  from: string;

  @ApiProperty({ description: 'Inclusive YYYY-MM-DD' })
  @IsDateString()
  to: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  propertyId?: string;
}
