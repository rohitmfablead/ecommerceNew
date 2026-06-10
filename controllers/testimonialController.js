import Testimonial from '../models/Testimonial.js';

export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    console.error("Testimonial fetch error:", error);
    res.status(500).json({ message: "Server error fetching testimonials." });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    const savedTestimonial = await testimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    console.error("Testimonial create error:", error);
    res.status(400).json({ message: "Error creating testimonial.", error: error.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, req.body, { returnDocument: 'after', runValidators: true });
    
    if (!updatedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found." });
    }
    
    res.json(updatedTestimonial);
  } catch (error) {
    console.error("Testimonial update error:", error);
    res.status(400).json({ message: "Error updating testimonial.", error: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
    
    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found." });
    }
    
    res.json({ message: "Testimonial deleted successfully." });
  } catch (error) {
    console.error("Testimonial delete error:", error);
    res.status(500).json({ message: "Server error deleting testimonial." });
  }
};
