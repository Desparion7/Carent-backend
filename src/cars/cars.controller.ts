import { Controller, Get, Param, Query } from '@nestjs/common';
import { CarsService } from './cars.service';

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
}
