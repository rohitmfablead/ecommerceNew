import CartItem from '../models/CartItem.js';

// @desc    Get all cartItems
// @route   GET /api/cartItems
// @access  Public
export const getCartItems = async (req, res) => {
  try {
    const items = await CartItem.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single cartItem
// @route   GET /api/cartItems/:id
// @access  Public
export const getCartItemById = async (req, res) => {
  try {
    const item = await CartItem.findById(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'CartItem not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a cartItem
// @route   POST /api/cartItems
// @access  Public
export const createCartItem = async (req, res) => {
  try {
    const item = new CartItem(req.body);
    const createdItem = await item.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a cartItem
// @route   PUT /api/cartItems/:id
// @access  Public
export const updateCartItem = async (req, res) => {
  try {
    const item = await CartItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'CartItem not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a cartItem
// @route   DELETE /api/cartItems/:id
// @access  Public
export const deleteCartItem = async (req, res) => {
  try {
    const item = await CartItem.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'CartItem removed'  });
    } else {
      res.status(404).json({ success: false, message: 'CartItem not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
