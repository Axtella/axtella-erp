import { IsString, MaxLength } from 'class-validator';

export class AssignCompliancePackDto {
  @IsString()
  @MaxLength(80)
  compliancePackCode: string;
}
