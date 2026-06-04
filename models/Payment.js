import mongoose from 'mongoose';

const schema = mongoose.Schema(
  { order: String, method: { type: String, enum: ['UPI', 'Card', 'COD', 'Wallet', 'NetBanking'] }, amount: Number, status: { type: String, enum: ['Paid', 'Refunded', 'Pending', 'Failed'], default: 'Pending' }, date: String },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', schema);

export default Payment;
