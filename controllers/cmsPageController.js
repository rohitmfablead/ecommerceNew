import CmsPage from '../models/CmsPage.js';

// @desc    Get all cmsPages
// @route   GET /api/cmsPages
// @access  Public
export const getCmsPages = async (req, res) => {
  try {
    const items = await CmsPage.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single cmsPage
// @route   GET /api/cmsPages/:id
// @access  Public
export const getCmsPageById = async (req, res) => {
  try {
    const item = await CmsPage.findById(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'CmsPage not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a cmsPage
// @route   POST /api/cmsPages
// @access  Public
export const createCmsPage = async (req, res) => {
  try {
    const item = new CmsPage(req.body);
    const createdItem = await item.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a cmsPage
// @route   PUT /api/cmsPages/:id
// @access  Public
export const updateCmsPage = async (req, res) => {
  try {
    const item = await CmsPage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'CmsPage not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a cmsPage
// @route   DELETE /api/cmsPages/:id
// @access  Public
export const deleteCmsPage = async (req, res) => {
  try {
    const item = await CmsPage.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'CmsPage removed'  });
    } else {
      res.status(404).json({ success: false, message: 'CmsPage not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
