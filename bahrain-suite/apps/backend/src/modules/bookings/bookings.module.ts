import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BookingGuest } from './entities/booking-guest.entity';
import { CheckinCheckoutLog } from './entities/checkin-checkout-log.entity';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Property } from '../properties/entities/property.entity';
import { CostCenter } from '../cost-centers/entities/cost-center.entity';
import { Unit } from '../units/entities/unit.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { UnitType } from '../unit-types/entities/unit-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Booking,
      BookingGuest,
      CheckinCheckoutLog,
      Property,
      CostCenter,
      Unit,
      UnitType,
      Tenant,
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [TypeOrmModule, BookingsService],
})
export class BookingsModule {}
