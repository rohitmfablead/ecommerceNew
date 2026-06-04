import mongoose from 'mongoose';

const schema = mongoose.Schema(
  { slug: { type: String, unique: true }, pageTitle: String, pageDescription: String, bannerTitle: String, bannerDescription: String, buttonText: String, buttonLink: String, metaTitle: String, metaDescription: String },
  { timestamps: true }
);

const CmsPageContent = mongoose.model('CmsPageContent', schema);

export default CmsPageContent;
