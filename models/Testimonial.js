import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    default: "Customer",
  },
  product: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Approved",
  },
}, { timestamps: true });

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;
