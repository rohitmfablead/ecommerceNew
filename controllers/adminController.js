import Admin from '../models/Admin.js';

// @desc    Get all admins
// @route   GET /api/admins
// @access  Public
export const getAdmins = async (req, res) => {
  try {
    const items = await Admin.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single admin
// @route   GET /api/admins/:id
// @access  Public
export const getAdminById = async (req, res) => {
  try {
    const item = await Admin.findById(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Admin not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a admin
// @route   POST /api/admins
// @access  Public
export const createAdmin = async (req, res) => {
  try {
    const item = new Admin(req.body);
    const createdItem = await item.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a admin
// @route   PUT /api/admins/:id
// @access  Public
export const updateAdmin = async (req, res) => {
  try {
    const item = await Admin.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Admin not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a admin
// @route   DELETE /api/admins/:id
// @access  Public
export const deleteAdmin = async (req, res) => {
  try {
    const item = await Admin.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Admin removed'  });
    } else {
      res.status(404).json({ success: false, message: 'Admin not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
