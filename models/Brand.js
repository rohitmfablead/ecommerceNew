import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String }
  },
  { timestamps: true, strict: false }
);

const Brand = mongoose.model('Brand', schema);

export default Brand;
