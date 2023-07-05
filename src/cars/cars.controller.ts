import { Controller, Get, Param, Query } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getCars(@Query() query: { brand: string }) {
    return this.carsService.getCars(query);
  }
  @Get(':id')
  getCarById(@Param('id') id: string) {
    return this.carsService.getCarById(id);
  }
}
