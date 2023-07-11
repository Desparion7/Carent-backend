import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from './interface/car.interface';

@Injectable()
export class CarsService {
  constructor(@InjectModel('Car') private carModel: Model<Car>) {}

  async getCars({ brand, startDate, endDate }): Promise<Car[]> {
    let cars = await this.carModel.find();
    if (!cars) {
      throw new NotFoundException('not found');
    }
    if (brand == 'All' && !startDate && !endDate) {
      return cars;
    }
    if (brand !== 'All') {
      cars = cars.filter((car) => car.brand === brand);
    }
    if (startDate && endDate) {
      const convertedStartDate = new Date(startDate);
      convertedStartDate.setUTCDate(convertedStartDate.getUTCDate() + 1);
      convertedStartDate.setUTCHours(0, 0, 0, 0);

      const convertedEndDate = new Date(endDate);
      convertedEndDate.setUTCDate(convertedEndDate.getUTCDate() + 1);
      convertedEndDate.setUTCHours(0, 0, 0, 0);
      const dates = [];

      // add dates beetwen start date and end date
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
      // filter cars and left only these with free date
      cars = cars.filter((car) => {
        return !car.calendar.some((date) =>
          formattedDates.includes(
            date.toLocaleDateString('pl-PL', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }),
          ),
        );
      });
    }

    return cars;
  }

  async getCarByName(name: string) {
    const car = await this.carModel.findOne({ name }).exec();
    if (!car) {
      throw new NotFoundException('no car with given id found');
    }
    return car;
  }
}
