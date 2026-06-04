import mongoose from 'mongoose';

const schema = mongoose.Schema(
  { user: String, product: String, addedOn: String },
  { timestamps: true }
);

const WishlistItem = mongoose.model('WishlistItem', schema);

export default WishlistItem;
