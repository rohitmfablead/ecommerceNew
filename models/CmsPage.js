import mongoose from 'mongoose';

const schema = mongoose.Schema(
  { slug: { type: String, unique: true }, title: String, content: String, updated: String },
  { timestamps: true }
);

const CmsPage = mongoose.model('CmsPage', schema);

export default CmsPage;
