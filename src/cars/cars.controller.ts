import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { CarsService } from './cars.service';
import { BookingCar } from './dto/booking-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getCars(
    @Query() query: { brand: string; startDate: string; endDate: string },
  ) {
    return this.carsService.getCars(query);
  }

  @Get(':name')
  getCarByName(@Param('name') name: string) {
    return this.carsService.getCarByName(name);
  }
  @Post('/booking')
  bookCar(@Body() body: BookingCar) {
    return this.carsService.bookCar(body);
  }
}
