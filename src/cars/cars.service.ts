import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from './interface/car.interface';

@Injectable()
export class CarsService {
  constructor(@InjectModel('Car') private carModel: Model<Car>) {}

  async getCars({ brand }) {
    if (brand === 'All') {
      const cars = await this.carModel.find();
      if (!cars) {
        throw new NotFoundException('not found');
      }
      return cars;
    } else {
      const cars = await this.carModel.find({ brand });
      if (!cars) {
        throw new NotFoundException('not found');
      }
      return cars;
    }
  }
  async getCarById(id: string) {
    const car = await this.carModel.findById({ _id: id }).exec();
    if (!car) {
      throw new NotFoundException('no car with given id found');
    }
    return { car };
  }
}
