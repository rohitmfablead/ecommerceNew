import Banner from '../models/Banner.js';

// @desc    Get all banners
// @route   GET /api/banners
// @access  Public
export const getBanners = async (req, res) => {
  try {
    const items = await Banner.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single banner
// @route   GET /api/banners/:id
// @access  Public
export const getBannerById = async (req, res) => {
  try {
    const item = await Banner.findById(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Banner not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a banner
// @route   POST /api/banners
// @access  Public
export const createBanner = async (req, res) => {
  try {
    const item = new Banner(req.body);
    const createdItem = await item.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a banner
// @route   PUT /api/banners/:id
// @access  Public
export const updateBanner = async (req, res) => {
  try {
    const item = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'Banner not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a banner
// @route   DELETE /api/banners/:id
// @access  Public
export const deleteBanner = async (req, res) => {
  try {
    const item = await Banner.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Banner removed'  });
    } else {
      res.status(404).json({ success: false, message: 'Banner not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
