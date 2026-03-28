import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UnitTypesService } from './unit-types.service';
import { CreateUnitTypeDto } from './dto/create-unit-type.dto';
import { UpdateUnitTypeDto } from './dto/update-unit-type.dto';
import { FindUnitTypesQueryDto } from './dto/find-unit-types-query.dto';

@Controller('unit-types')
export class UnitTypesController {
  constructor(private readonly service: UnitTypesService) {}
  @Post() create(@Body() dto: CreateUnitTypeDto) { return this.service.create(dto); }
  @Get() findAll(@Query() query: FindUnitTypesQueryDto) { return this.service.findAll(query); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateUnitTypeDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
