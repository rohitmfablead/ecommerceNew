import CmsSection from '../models/CmsSection.js';

// @desc    Get all cmsSections
// @route   GET /api/cmsSections
// @access  Public
export const getCmsSections = async (req, res) => {
  try {
    const items = await CmsSection.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single cmsSection
// @route   GET /api/cmsSections/:id
// @access  Public
export const getCmsSectionById = async (req, res) => {
  try {
    const item = await CmsSection.findById(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'CmsSection not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a cmsSection
// @route   POST /api/cmsSections
// @access  Public
export const createCmsSection = async (req, res) => {
  try {
    const item = new CmsSection(req.body);
    const createdItem = await item.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a cmsSection
// @route   PUT /api/cmsSections/:id
// @access  Public
export const updateCmsSection = async (req, res) => {
  try {
    // Use $set so partial updates (e.g. toggle isActive) don't overwrite other fields like image
    const item = await CmsSection.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { returnDocument: 'after', runValidators: false }
    );
    if (item) {
      res.status(200).json({ success: true, message: 'Updated successfully', data: item });
    } else {
      res.status(404).json({ success: false, message: 'CmsSection not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a cmsSection
// @route   DELETE /api/cmsSections/:id
// @access  Public
export const deleteCmsSection = async (req, res) => {
  try {
    const item = await CmsSection.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ success: true, message: 'CmsSection removed'  });
    } else {
      res.status(404).json({ success: false, message: 'CmsSection not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
