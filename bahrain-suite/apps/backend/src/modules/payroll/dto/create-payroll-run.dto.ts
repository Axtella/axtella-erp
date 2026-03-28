import { IsInt, Min, Max } from 'class-validator';

export class CreatePayrollRunDto {
  @IsInt()
  @Min(1)
  @Max(12)
  payrollMonth: number;

  @IsInt()
  payrollYear: number;
}
