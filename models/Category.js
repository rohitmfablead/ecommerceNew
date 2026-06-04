import mongoose from 'mongoose';

const schema = mongoose.Schema(
  { name: String, icon: String, count: { type: Number, default: 0 } },
  { timestamps: true }
);

const Category = mongoose.model('Category', schema);

export default Category;
