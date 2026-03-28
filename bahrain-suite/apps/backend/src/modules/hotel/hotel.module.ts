import { Module } from '@nestjs/common';
import { HotelGuestsModule } from './guests/guests.module';
import { HotelHousekeepingModule } from './housekeeping/housekeeping.module';
import { HotelPropertiesModule } from './properties/properties.module';
import { HotelReservationsModule } from './reservations/reservations.module';
import { HotelRoomTypesModule } from './room-types/room-types.module';
import { HotelRoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    HotelPropertiesModule,
    HotelRoomTypesModule,
    HotelRoomsModule,
    HotelGuestsModule,
    HotelReservationsModule,
    HotelHousekeepingModule,
  ],
})
export class HotelModule {}
