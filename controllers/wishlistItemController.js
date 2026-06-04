import WishlistItem from '../models/WishlistItem.js';

// @desc    Get all wishlistItems
// @route   GET /api/wishlistItems
// @access  Public
export const getWishlistItems = async (req, res) => {
  try {
    const items = await WishlistItem.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single wishlistItem
// @route   GET /api/wishlistItems/:id
// @access  Public
export const getWishlistItemById = async (req, res) => {
  try {
    const item = await WishlistItem.findById(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'WishlistItem not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a wishlistItem
// @route   POST /api/wishlistItems
// @access  Public
export const createWishlistItem = async (req, res) => {
  try {
    const item = new WishlistItem(req.body);
    const createdItem = await item.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a wishlistItem
// @route   PUT /api/wishlistItems/:id
// @access  Public
export const updateWishlistItem = async (req, res) => {
  try {
    const item = await WishlistItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'WishlistItem not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a wishlistItem
// @route   DELETE /api/wishlistItems/:id
// @access  Public
export const deleteWishlistItem = async (req, res) => {
  try {
    const item = await WishlistItem.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'WishlistItem removed'  });
    } else {
      res.status(404).json({ success: false, message: 'WishlistItem not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
