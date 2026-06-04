import mongoose from 'mongoose';

const schema = mongoose.Schema(
  { name: String, email: { type: String, unique: true }, products: { type: Number, default: 0 }, sales: { type: Number, default: 0 }, status: { type: String, enum: ['Approved', 'Pending', 'Rejected'], default: 'Pending' } },
  { timestamps: true }
);

const Vendor = mongoose.model('Vendor', schema);

export default Vendor;
