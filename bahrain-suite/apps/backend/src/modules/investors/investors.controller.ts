import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { InvestorsService } from './investors.service';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { FindInvestorsQueryDto } from './dto/find-investors-query.dto';

@Controller('investors')
export class InvestorsController {
  constructor(private readonly service: InvestorsService) {}

  @Post() create(@Body() dto: CreateInvestorDto) { return this.service.create(dto); }
  @Get() findAll(@Query() query: FindInvestorsQueryDto) { return this.service.findAll(query); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateInvestorDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
