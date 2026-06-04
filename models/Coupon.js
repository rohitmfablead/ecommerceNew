import mongoose from 'mongoose';

const schema = mongoose.Schema(
  { code: { type: String, unique: true }, discountType: { type: String, enum: ['percent', 'flat'] }, value: Number, expires: String, usage: { type: Number, default: 0 }, status: { type: String, enum: ['Active', 'Expired', 'Scheduled'], default: 'Active' } },
  { timestamps: true }
);

const Coupon = mongoose.model('Coupon', schema);

export default Coupon;
