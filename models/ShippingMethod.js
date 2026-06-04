import mongoose from 'mongoose';

const schema = mongoose.Schema(
  { name: String, cost: Number, eta: String, active: { type: Boolean, default: true } },
  { timestamps: true }
);

const ShippingMethod = mongoose.model('ShippingMethod', schema);

export default ShippingMethod;
