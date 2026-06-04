import mongoose from 'mongoose';

const schema = mongoose.Schema(
  { product: String, change: Number, reason: { type: String, enum: ['Restock', 'Sale', 'Return', 'Damage', 'Adjustment'] }, date: String },
  { timestamps: true }
);

const InventoryLog = mongoose.model('InventoryLog', schema);

export default InventoryLog;
