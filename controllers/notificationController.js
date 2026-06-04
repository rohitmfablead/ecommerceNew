import Notification from '../models/Notification.js';

// @desc    Get all notifications
// @route   GET /api/notifications
// @access  Public
export const getNotifications = async (req, res) => {
  try {
    const items = await Notification.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single notification
// @route   GET /api/notifications/:id
// @access  Public
export const getNotificationById = async (req, res) => {
  try {
    const item = await Notification.findById(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Notification not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a notification
// @route   POST /api/notifications
// @access  Public
export const createNotification = async (req, res) => {
  try {
    const item = new Notification(req.body);
    const createdItem = await item.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a notification
// @route   PUT /api/notifications/:id
// @access  Public
export const updateNotification = async (req, res) => {
  try {
    const item = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Notification not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
// @access  Public
export const deleteNotification = async (req, res) => {
  try {
    const item = await Notification.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Notification removed'  });
    } else {
      res.status(404).json({ success: false, message: 'Notification not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
