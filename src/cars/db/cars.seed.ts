import { Seeder } from 'nestjs-seeder';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from '../interface/car.interface';
import { cars as carData } from './cars.db';

@Injectable()
export class CarsSeeder implements Seeder {
  constructor(
    @InjectModel('Car')
    private readonly car: Model<Car>,
  ) {}
  async seed(): Promise<any> {
    const cars = carData.map((carData) => ({
      acceleration: carData.acceleration,
      brand: carData.brand,
      calendar: carData.calendar,
      color: carData.color,
      dailyPrice: carData.dailyPrice,
      description: carData.description,
      drivetrain: carData.drivetrain,
      engine: carData.engine,
      equipment: carData.equipment,
      gas: carData.gas,
      img: carData.img,
      max: carData.max,
      mileage: carData.mileage,
      name: carData.name,
      power: carData.power,
      priceList: carData.priceList,
      seats: carData.seats,
      torque: carData.torque,
      transmission: carData.transmission,
      year: carData.year,
    }));
    return this.car.insertMany(cars);
  }
  async drop(): Promise<any> {
    return this.car.deleteMany({});
  }
}
