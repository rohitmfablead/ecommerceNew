import mongoose from 'mongoose';

const schema = mongoose.Schema(
  { title: String, author: String, date: String, status: { type: String, enum: ['Published', 'Draft'], default: 'Draft' }, excerpt: String },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', schema);

export default Blog;
