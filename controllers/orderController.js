import Order from '../models/Order.js';

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public
export const getOrders = async (req, res) => {
  try {
    const items = await Order.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Public
export const getOrderById = async (req, res) => {
  try {
    const item = await Order.findById(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Order not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a order
// @route   POST /api/orders
// @access  Public
export const createOrder = async (req, res) => {
  try {
    const item = new Order(req.body);
    const createdItem = await item.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a order
// @route   PUT /api/orders/:id
// @access  Public
export const updateOrder = async (req, res) => {
  try {
    const item = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Order not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a order
// @route   DELETE /api/orders/:id
// @access  Public
export const deleteOrder = async (req, res) => {
  try {
    const item = await Order.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Order removed'  });
    } else {
      res.status(404).json({ success: false, message: 'Order not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
