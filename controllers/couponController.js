import Coupon from '../models/Coupon.js';

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Public
export const getCoupons = async (req, res) => {
  try {
    const items = await Coupon.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single coupon
// @route   GET /api/coupons/:id
// @access  Public
export const getCouponById = async (req, res) => {
  try {
    const item = await Coupon.findById(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Coupon not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a coupon
// @route   POST /api/coupons
// @access  Public
export const createCoupon = async (req, res) => {
  try {
    const item = new Coupon(req.body);
    const createdItem = await item.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a coupon
// @route   PUT /api/coupons/:id
// @access  Public
export const updateCoupon = async (req, res) => {
  try {
    const item = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Coupon not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a coupon
// @route   DELETE /api/coupons/:id
// @access  Public
export const deleteCoupon = async (req, res) => {
  try {
    const item = await Coupon.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Coupon removed'  });
    } else {
      res.status(404).json({ success: false, message: 'Coupon not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
