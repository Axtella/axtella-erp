import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { FindUnitsDto } from './dto/find-units.dto';

@Controller('units')
export class UnitsController {
  constructor(private readonly service: UnitsService) {}
  @Post() create(@Body() dto: CreateUnitDto) { return this.service.create(dto); }
  @Get() findAll(@Query() query: FindUnitsDto) { return this.service.findAll(query); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateUnitDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
