import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogItemGroupDto } from './create-catalog-item-group.dto';

export class UpdateCatalogItemGroupDto extends PartialType(
  CreateCatalogItemGroupDto,
) {}
