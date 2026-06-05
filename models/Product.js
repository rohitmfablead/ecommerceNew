import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    shortDesc: { type: String },
    longDesc: { type: String },
    brand: { type: String },
    category: { type: String },
    subcategory: { type: String },
    price: { type: Number, required: true, default: 0 },
    salePrice: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    stockStatus: { type: String, enum: ['In Stock', 'Out of Stock', 'Pre-order'], default: 'In Stock' },
    status: { type: String, enum: ['Active', 'Draft', 'Out of stock'], default: 'Draft' },
    image: { type: String, required: false },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    variations: [{ type: mongoose.Schema.Types.Mixed }], // Flexible for size, color, etc.
    
    // Condition Flags for Dynamic Sections
    isFeatured: { type: Boolean, default: false },
    isBestSelling: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isRecommended: { type: Boolean, default: false },
    isFlashSale: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
