import { IsBoolean, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateCostCenterDto {
  @IsUUID() propertyId: string;
  @IsString() @MaxLength(50) code: string;
  @IsString() @MaxLength(200) name: string;
  @IsString() @MaxLength(50) costCenterType: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
