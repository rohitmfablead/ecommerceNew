import mongoose from 'mongoose';

const schema = mongoose.Schema(
  { user: String, product: String, quantity: Number, price: Number },
  { timestamps: true }
);

const CartItem = mongoose.model('CartItem', schema);

export default CartItem;
