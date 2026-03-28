import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { JournalLineInputDto } from './journal-line-input.dto';

export class CreateJournalEntryDto {
  @ApiProperty({ example: '2026-03-15' })
  @IsDateString()
  entryDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  propertyId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  narration?: string;

  @ApiProperty({ type: [JournalLineInputDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => JournalLineInputDto)
  lines: JournalLineInputDto[];
}
