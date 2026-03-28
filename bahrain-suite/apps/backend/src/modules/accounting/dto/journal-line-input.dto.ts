import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { INCOME_CHANNELS } from '../income-channels';

export class JournalLineInputDto {
  @ApiProperty({ example: '4000' })
  @IsString()
  @MaxLength(50)
  accountCode: string;

  @ApiProperty({ example: 1000 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  debit: number;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  credit: number;

  @ApiPropertyOptional({
    enum: INCOME_CHANNELS,
    description:
      'For revenue lines: cash_receipt | pos | benefit_pay (income & expense by channel)',
  })
  @IsOptional()
  @IsString()
  @IsIn([...INCOME_CHANNELS])
  incomeChannel?: (typeof INCOME_CHANNELS)[number];
}
