import CmsPageContent from '../models/CmsPageContent.js';

// @desc    Get all cmsPageContents
// @route   GET /api/cmsPageContents
// @access  Public
export const getCmsPageContents = async (req, res) => {
  try {
    const items = await CmsPageContent.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single cmsPageContent
// @route   GET /api/cmsPageContents/:id
// @access  Public
export const getCmsPageContentById = async (req, res) => {
  try {
    const item = await CmsPageContent.findById(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'CmsPageContent not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a cmsPageContent
// @route   POST /api/cmsPageContents
// @access  Public
export const createCmsPageContent = async (req, res) => {
  try {
    const item = new CmsPageContent(req.body);
    const createdItem = await item.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a cmsPageContent
// @route   PUT /api/cmsPageContents/:id
// @access  Public
export const updateCmsPageContent = async (req, res) => {
  try {
    const item = await CmsPageContent.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'CmsPageContent not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a cmsPageContent
// @route   DELETE /api/cmsPageContents/:id
// @access  Public
export const deleteCmsPageContent = async (req, res) => {
  try {
    const item = await CmsPageContent.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'CmsPageContent removed'  });
    } else {
      res.status(404).json({ success: false, message: 'CmsPageContent not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
