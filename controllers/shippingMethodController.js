import ShippingMethod from '../models/ShippingMethod.js';

// @desc    Get all shippingMethods
// @route   GET /api/shippingMethods
// @access  Public
export const getShippingMethods = async (req, res) => {
  try {
    const items = await ShippingMethod.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single shippingMethod
// @route   GET /api/shippingMethods/:id
// @access  Public
export const getShippingMethodById = async (req, res) => {
  try {
    const item = await ShippingMethod.findById(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'ShippingMethod not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a shippingMethod
// @route   POST /api/shippingMethods
// @access  Public
export const createShippingMethod = async (req, res) => {
  try {
    const item = new ShippingMethod(req.body);
    const createdItem = await item.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a shippingMethod
// @route   PUT /api/shippingMethods/:id
// @access  Public
export const updateShippingMethod = async (req, res) => {
  try {
    const item = await ShippingMethod.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'ShippingMethod not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a shippingMethod
// @route   DELETE /api/shippingMethods/:id
// @access  Public
export const deleteShippingMethod = async (req, res) => {
  try {
    const item = await ShippingMethod.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'ShippingMethod removed'  });
    } else {
      res.status(404).json({ success: false, message: 'ShippingMethod not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
