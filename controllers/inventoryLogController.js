import InventoryLog from '../models/InventoryLog.js';

// @desc    Get all inventoryLogs
// @route   GET /api/inventoryLogs
// @access  Public
export const getInventoryLogs = async (req, res) => {
  try {
    const items = await InventoryLog.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single inventoryLog
// @route   GET /api/inventoryLogs/:id
// @access  Public
export const getInventoryLogById = async (req, res) => {
  try {
    const item = await InventoryLog.findById(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'InventoryLog not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a inventoryLog
// @route   POST /api/inventoryLogs
// @access  Public
export const createInventoryLog = async (req, res) => {
  try {
    const item = new InventoryLog(req.body);
    const createdItem = await item.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a inventoryLog
// @route   PUT /api/inventoryLogs/:id
// @access  Public
export const updateInventoryLog = async (req, res) => {
  try {
    const item = await InventoryLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'InventoryLog not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a inventoryLog
// @route   DELETE /api/inventoryLogs/:id
// @access  Public
export const deleteInventoryLog = async (req, res) => {
  try {
    const item = await InventoryLog.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'InventoryLog removed'  });
    } else {
      res.status(404).json({ success: false, message: 'InventoryLog not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
