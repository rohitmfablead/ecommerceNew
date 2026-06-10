import Category from '../models/Category.js';

// @desc    Get all categorys
// @route   GET /api/categorys
// @access  Public
export const getCategorys = async (req, res) => {
  try {
    const items = await Category.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single category
// @route   GET /api/categorys/:id
// @access  Public
export const getCategoryById = async (req, res) => {
  try {
    const item = await Category.findById(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Category not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a category
// @route   POST /api/categorys
// @access  Public
export const createCategory = async (req, res) => {
  try {
    const item = new Category(req.body);
    const createdItem = await item.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a category
// @route   PUT /api/categorys/:id
// @access  Public
export const updateCategory = async (req, res) => {
  try {
    const item = await Category.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Category not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categorys/:id
// @access  Public
export const deleteCategory = async (req, res) => {
  try {
    const item = await Category.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Category removed'  });
    } else {
      res.status(404).json({ success: false, message: 'Category not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
