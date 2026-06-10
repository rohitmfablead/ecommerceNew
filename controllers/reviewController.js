import Review from '../models/Review.js';

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
export const getReviews = async (req, res) => {
  try {
    const items = await Review.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
export const getReviewById = async (req, res) => {
  try {
    const item = await Review.findById(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Review not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Public
export const createReview = async (req, res) => {
  try {
    const item = new Review(req.body);
    const createdItem = await item.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Public
export const updateReview = async (req, res) => {
  try {
    const item = await Review.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Review not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Public
export const deleteReview = async (req, res) => {
  try {
    const item = await Review.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Review removed'  });
    } else {
      res.status(404).json({ success: false, message: 'Review not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
