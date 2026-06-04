import mongoose from 'mongoose';

const schema = mongoose.Schema(
  { product: String, customer: String, rating: Number, comment: String, status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }, date: String },
  { timestamps: true }
);

const Review = mongoose.model('Review', schema);

export default Review;
