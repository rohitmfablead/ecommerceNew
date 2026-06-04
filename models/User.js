import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const schema = mongoose.Schema(
  { name: String, email: { type: String, unique: true }, password: { type: String, required: true }, phone: String, orders: { type: Number, default: 0 }, joined: String, status: { type: String, enum: ['Active', 'Blocked'], default: 'Active' } },
  { timestamps: true }
);

schema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

schema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', schema);

export default User;
