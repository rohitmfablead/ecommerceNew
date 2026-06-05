import mongoose from 'mongoose';

const homeSectionSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    display_order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    selectionType: { type: String, enum: ['manual', 'condition'], default: 'manual' },
    condition: { 
      type: String, 
      enum: ['Featured', 'Best Selling', 'New Arrival', 'Trending', 'Recommended', 'Flash Sale'],
      required: function() { return this.selectionType === 'condition'; }
    },
    category: { type: String, default: "" },
    manualProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  },
  {
    timestamps: true,
  }
);

const HomeSection = mongoose.model('HomeSection', homeSectionSchema);

export default HomeSection;
