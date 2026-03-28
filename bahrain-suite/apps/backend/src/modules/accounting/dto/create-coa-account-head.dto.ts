import { IsBoolean, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export const COA_ACCOUNT_TYPES = [
  'asset',
  'liability',
  'equity',
  'revenue',
  'expense',
] as const;

export type CoaAccountType = (typeof COA_ACCOUNT_TYPES)[number];

export class CreateCoaAccountHeadDto {
  @IsString()
  @MaxLength(50)
  accountCode: string;

  @IsString()
  @MaxLength(200)
  name: string;

  @IsString()
  @IsIn([...COA_ACCOUNT_TYPES])
  accountType: CoaAccountType;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  notes?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
