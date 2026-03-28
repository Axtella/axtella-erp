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
import { CatalogItemsService } from './catalog-items.service';
import { CreateCatalogItemDto } from './dto/create-catalog-item.dto';
import { UpdateCatalogItemDto } from './dto/update-catalog-item.dto';
import { FindCatalogItemsDto } from './dto/find-catalog-items.dto';

@Controller('catalog-items')
export class CatalogItemsController {
  constructor(private readonly service: CatalogItemsService) {}

  @Post()
  create(@Body() dto: CreateCatalogItemDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: FindCatalogItemsDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCatalogItemDto) {
    return this.service.update(id, dto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
