import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { FindTenantsDto } from './dto/find-tenants.dto';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly service: TenantsService) {}
  @Post() create(@Body() dto: CreateTenantDto) { return this.service.create(dto); }
  @Get() findAll(@Query() query: FindTenantsDto) { return this.service.findAll(query); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateTenantDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
