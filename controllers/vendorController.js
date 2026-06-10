import Vendor from '../models/Vendor.js';

// @desc    Get all vendors
// @route   GET /api/vendors
// @access  Public
export const getVendors = async (req, res) => {
  try {
    const items = await Vendor.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single vendor
// @route   GET /api/vendors/:id
// @access  Public
export const getVendorById = async (req, res) => {
  try {
    const item = await Vendor.findById(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Vendor not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a vendor
// @route   POST /api/vendors
// @access  Public
export const createVendor = async (req, res) => {
  try {
    const item = new Vendor(req.body);
    const createdItem = await item.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a vendor
// @route   PUT /api/vendors/:id
// @access  Public
export const updateVendor = async (req, res) => {
  try {
    const item = await Vendor.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Vendor not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a vendor
// @route   DELETE /api/vendors/:id
// @access  Public
export const deleteVendor = async (req, res) => {
  try {
    const item = await Vendor.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Vendor removed'  });
    } else {
      res.status(404).json({ success: false, message: 'Vendor not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
