import WishlistItem from '../models/WishlistItem.js';
import Product from '../models/Product.js';

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
    const item = await WishlistItem.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
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

// @desc    Get logged in user wishlist
// @route   GET /api/wishlistItems/mywishlist
// @access  Private
export const getMyWishlist = async (req, res) => {
  try {
    const items = await WishlistItem.find({ user: req.user._id.toString() }).sort({ createdAt: -1 });
    
    // Manually populate product details since it's a string
    const populatedItems = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (product) {
        populatedItems.push({
          _id: item._id,
          user: item.user,
          addedOn: item.addedOn,
          product: product
        });
      }
    }
    
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: populatedItems.length, data: populatedItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add item to my wishlist
// @route   POST /api/wishlistItems/mywishlist
// @access  Private
export const addToMyWishlist = async (req, res) => {
  try {
    const { product } = req.body;
    const userId = req.user._id.toString();

    let item = await WishlistItem.findOne({ user: userId, product });
    if (!item) {
      item = new WishlistItem({ user: userId, product, addedOn: new Date().toISOString() });
      await item.save();
    }
    res.status(201).json({ success: true, message: 'Added to wishlist successfully', data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Remove item from my wishlist
// @route   DELETE /api/wishlistItems/mywishlist/:productId
// @access  Private
export const removeFromMyWishlist = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const item = await WishlistItem.findOneAndDelete({ user: userId, product: req.params.productId });
    if (item) {
      res.status(200).json({ success: true, message: 'Removed from wishlist successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Wishlist item not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
