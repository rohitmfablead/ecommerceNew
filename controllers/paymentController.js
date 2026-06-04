import Payment from '../models/Payment.js';

// @desc    Get all payments
// @route   GET /api/payments
// @access  Public
export const getPayments = async (req, res) => {
  try {
    const items = await Payment.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single payment
// @route   GET /api/payments/:id
// @access  Public
export const getPaymentById = async (req, res) => {
  try {
    const item = await Payment.findById(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Payment not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a payment
// @route   POST /api/payments
// @access  Public
export const createPayment = async (req, res) => {
  try {
    const item = new Payment(req.body);
    const createdItem = await item.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a payment
// @route   PUT /api/payments/:id
// @access  Public
export const updatePayment = async (req, res) => {
  try {
    const item = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Payment not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a payment
// @route   DELETE /api/payments/:id
// @access  Public
export const deletePayment = async (req, res) => {
  try {
    const item = await Payment.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Payment removed'  });
    } else {
      res.status(404).json({ success: false, message: 'Payment not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
