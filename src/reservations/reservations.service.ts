import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReservationCar } from './dto/reservation.dto';
import { Model } from 'mongoose';
import { Reservation } from './interface/reservation.interface';
import { Car } from 'src/cars/interface/car.interface';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel('Reservation') private reservationsModel: Model<Reservation>,
    @InjectModel('Car') private carModel: Model<Car>,
  ) {}
  async bookCar(body: ReservationCar) {
    const carId = body.carId;

    const car = await this.carModel.findById(carId);
    if (!car) {
      throw new NotFoundException('no car with given id found');
    }
    // Prepare dates
    const convertedStartDate = new Date(body.pickupDate);
    convertedStartDate.setUTCDate(convertedStartDate.getUTCDate() - 1);
    convertedStartDate.setUTCHours(0, 0, 0, 0);
    const convertedEndDate = new Date(body.returnDate);
    convertedEndDate.setUTCDate(convertedEndDate.getUTCDate() - 1);
    convertedEndDate.setUTCHours(0, 0, 0, 0);
    const dates = [];
    while (convertedStartDate <= convertedEndDate) {
      dates.push(new Date(convertedStartDate));
      convertedStartDate.setDate(convertedStartDate.getDate() + 1);
    }
    // convert date object to string
    const formattedDates = dates.map((date) => {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    });

    const isBooked = car.calendar.some((date) =>
      formattedDates.includes(
        date.toLocaleDateString('pl-PL', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      ),
    );
    if (isBooked) {
      return { error: 'Car is not available in choosed date' };
    }
    const newReservation = new this.reservationsModel({
      carId: body.carId,
      name: body.name,
      surname: body.surname,
      phone: body.phone,
      pickupDate: body.pickupDate,
      returnDate: body.returnDate,
    });
    const result = await newReservation.save();
    const newCarCalendar = [...car.calendar, ...dates];
    car.calendar = newCarCalendar;
    await car.save();
    return result;
  }
}
