import { IsString, MaxLength } from 'class-validator';

export class CreateUnitTypeDto {
  @IsString() @MaxLength(50) code: string;
  @IsString() @MaxLength(100) name: string;
  @IsString() @MaxLength(50) category: string;
}
