import * as mongoose from 'mongoose';

export const CarSchema = new mongoose.Schema({
  acceleration: { type: String, require: true },
  brand: { type: String, require: true },
  calendar: [{ type: Date, require: true }],
  color: { type: String, require: true },
  dailyPrice: { type: String, require: true },
  description: { type: String, require: true },
  drivetrain: { type: String, require: true },
  engine: { type: String, require: true },
  equipment: [{ type: String, require: true }],
  gas: { type: String, require: true },
  img: [{ type: String, require: true }],
  max: { type: String, require: true },
  mileage: { type: String, require: true },
  name: { type: String, require: true },
  power: { type: String, require: true },
  priceList: {
    type: Map,
    of: Number,
    required: true,
  },
  seats: { type: String, require: true },
  torque: { type: String, require: true },
  transmission: { type: String, require: true },
  year: { type: String, require: true },
});
