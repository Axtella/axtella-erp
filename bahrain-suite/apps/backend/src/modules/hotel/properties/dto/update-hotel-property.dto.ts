import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelPropertyDto } from './create-hotel-property.dto';

export class UpdateHotelPropertyDto extends PartialType(CreateHotelPropertyDto) {}
