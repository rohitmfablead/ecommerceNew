import mongoose from 'mongoose';

const schema = mongoose.Schema(
  { name: String, email: { type: String, unique: true }, role: { type: String, default: 'Admin' }, status: { type: String, enum: ['Active', 'Disabled'], default: 'Active' }, lastLogin: String },
  { timestamps: true }
);

const Admin = mongoose.model('Admin', schema);

export default Admin;
