import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';
import { CatalogItemGroupsService } from './catalog-item-groups.service';
import { CreateCatalogItemGroupDto } from './dto/create-catalog-item-group.dto';
import { UpdateCatalogItemGroupDto } from './dto/update-catalog-item-group.dto';
import { FindCatalogItemGroupsDto } from './dto/find-catalog-item-groups.dto';

@Controller('catalog-item-groups')
export class CatalogItemGroupsController {
  constructor(private readonly service: CatalogItemGroupsService) {}

  @Post()
  create(@Body() dto: CreateCatalogItemGroupDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: FindCatalogItemGroupsDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCatalogItemGroupDto) {
    return this.service.update(id, dto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
