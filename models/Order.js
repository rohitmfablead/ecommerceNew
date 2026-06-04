import mongoose from 'mongoose';

const schema = mongoose.Schema(
  { customer: String, email: String, date: String, items: Number, total: Number, status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' } },
  { timestamps: true }
);

const Order = mongoose.model('Order', schema);

export default Order;
