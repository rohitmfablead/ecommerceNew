import mongoose from 'mongoose';

const schema = mongoose.Schema(
  { channel: { type: String, enum: ['Email', 'Push'] }, title: String, sent: String, recipients: { type: Number, default: 0 }, status: { type: String, enum: ['Sent', 'Scheduled', 'Draft'], default: 'Draft' } },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', schema);

export default Notification;
