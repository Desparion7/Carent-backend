import { Controller, Body, Post } from '@nestjs/common';
import { ReservationCar } from './dto/reservation.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}
  @Post('')
  bookCar(@Body() body: ReservationCar) {
    return this.reservationsService.bookCar(body);
  }
}
