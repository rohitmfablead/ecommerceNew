import Brand from '../models/Brand.js';

// @desc    Get all brands
// @route   GET /api/brands
// @access  Public
export const getBrands = async (req, res) => {
  try {
    const items = await Brand.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single brand
// @route   GET /api/brands/:id
// @access  Public
export const getBrandById = async (req, res) => {
  try {
    const item = await Brand.findById(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Brand not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a brand
// @route   POST /api/brands
// @access  Public
export const createBrand = async (req, res) => {
  try {
    const item = new Brand(req.body);
    const createdItem = await item.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a brand
// @route   PUT /api/brands/:id
// @access  Public
export const updateBrand = async (req, res) => {
  try {
    const item = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Brand not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a brand
// @route   DELETE /api/brands/:id
// @access  Public
export const deleteBrand = async (req, res) => {
  try {
    const item = await Brand.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Brand removed'  });
    } else {
      res.status(404).json({ success: false, message: 'Brand not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
