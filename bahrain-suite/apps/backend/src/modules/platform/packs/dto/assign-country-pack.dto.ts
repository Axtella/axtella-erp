import { IsString, MaxLength } from 'class-validator';

export class AssignCountryPackDto {
  @IsString()
  @MaxLength(40)
  countryPackCode: string;
}
