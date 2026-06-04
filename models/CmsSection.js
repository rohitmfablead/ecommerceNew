import mongoose from 'mongoose';

const schema = mongoose.Schema(
  { page: String, section: String, title: String, subtitle: String, buttonText: String, buttonLink: String, isActive: { type: Boolean, default: true }, displayOrder: Number },
  { timestamps: true }
);

const CmsSection = mongoose.model('CmsSection', schema);

export default CmsSection;
