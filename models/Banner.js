import mongoose from 'mongoose';

const schema = mongoose.Schema(
  { title: String, subtitle: String, image: String, link: String, active: { type: Boolean, default: true }, position: { type: String, enum: ['Hero', 'Strip', 'Sidebar'] } },
  { timestamps: true }
);

const Banner = mongoose.model('Banner', schema);

export default Banner;
