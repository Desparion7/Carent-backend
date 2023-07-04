import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './cars/models/car.model';
import { CarsSeeder } from './cars/db/cars.seed';
import { ConfigModule } from '@nestjs/config';

seeder({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }]),
  ],
}).run([CarsSeeder]);
