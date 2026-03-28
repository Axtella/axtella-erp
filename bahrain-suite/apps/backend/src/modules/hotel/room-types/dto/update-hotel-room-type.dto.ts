import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelRoomTypeDto } from './create-hotel-room-type.dto';

export class UpdateHotelRoomTypeDto extends PartialType(CreateHotelRoomTypeDto) {}
