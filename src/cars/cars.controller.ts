import { Controller, Get, Param } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getCars() {
    return this.carsService.getCars();
  }
  @Get(':id')
  getCarById(@Param('id') id: string) {
    return this.carsService.getCarById(id);
  }
}
