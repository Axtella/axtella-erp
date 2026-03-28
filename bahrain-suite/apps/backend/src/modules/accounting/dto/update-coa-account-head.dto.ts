import { PartialType } from '@nestjs/mapped-types';
import { CreateCoaAccountHeadDto } from './create-coa-account-head.dto';

export class UpdateCoaAccountHeadDto extends PartialType(
  CreateCoaAccountHeadDto,
) {}
