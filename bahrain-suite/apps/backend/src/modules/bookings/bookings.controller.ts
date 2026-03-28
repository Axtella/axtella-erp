import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { CheckinDto } from './dto/checkin.dto';
import { CheckoutDto } from './dto/checkout.dto';
import { FindBookingsDto } from './dto/find-bookings.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}
  @Post() create(@Body() dto: CreateBookingDto) { return this.service.create(dto); }
  @Get() findAll(@Query() query: FindBookingsDto) { return this.service.findAll(query); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateBookingDto) { return this.service.update(id, dto); }
  @Post(':id/checkin') checkin(@Param('id') id: string, @Body() dto: CheckinDto) { return this.service.checkIn(id, dto); }
  @Post(':id/checkout') checkout(@Param('id') id: string, @Body() dto: CheckoutDto) { return this.service.checkOut(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
