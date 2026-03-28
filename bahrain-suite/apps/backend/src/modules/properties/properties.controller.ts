import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { FindPropertiesDto } from './dto/find-properties.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly service: PropertiesService) {}

  @Post()
  create(@Body() dto: CreatePropertyDto) {
    return this.service.create(dto);
  }

  @Post('bulk-upload')
  @Roles(UserRole.ADMIN, UserRole.ACCOUNTANT)
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 2 * 1024 * 1024 } }),
  )
  bulkUpload(@UploadedFile() file: Express.Multer.File) {
    if (!file?.buffer?.length) {
      throw new BadRequestException(
        'Upload a CSV file using multipart field name "file"',
      );
    }
    const text = file.buffer.toString('utf-8');
    return this.service.bulkImportFromCsv(text);
  }

  @Get()
  findAll(@Query() query: FindPropertiesDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePropertyDto) {
    return this.service.update(id, dto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
