import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CostCentersService } from './cost-centers.service';
import { CreateCostCenterDto } from './dto/create-cost-center.dto';
import { UpdateCostCenterDto } from './dto/update-cost-center.dto';
import { FindCostCentersDto } from './dto/find-cost-centers.dto';

@Controller('cost-centers')
export class CostCentersController {
  constructor(private readonly service: CostCentersService) {}
  @Post() create(@Body() dto: CreateCostCenterDto) { return this.service.create(dto); }
  @Get() findAll(@Query() query: FindCostCentersDto) { return this.service.findAll(query); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateCostCenterDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
