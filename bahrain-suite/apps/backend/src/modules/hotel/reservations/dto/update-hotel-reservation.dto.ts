import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelReservationDto } from './create-hotel-reservation.dto';

export class UpdateHotelReservationDto extends PartialType(CreateHotelReservationDto) {}
