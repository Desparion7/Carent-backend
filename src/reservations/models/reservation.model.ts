import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const ReservationSchema = new mongoose.Schema({
  name: { type: String, require: true },
  surname: { type: String, require: true },
  phone: { type: String, require: true },
  pickupDate: { type: String, require: true },
  returnDate: { type: String, require: true },
  carId: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
});
