import HomeSection from '../models/HomeSection.js';
import Product from '../models/Product.js';

// @desc    Get all active home sections with populated products for the frontend
// @route   GET /api/homesections/public
// @access  Public
export const getPublicHomeSections = async (req, res) => {
  try {
    const sections = await HomeSection.find({ isActive: true }).sort({ display_order: 1 }).populate('manualProducts');
    
    const formattedSections = [];

    for (const section of sections) {
      let products = [];
      
      if (section.selectionType === 'manual') {
        products = section.manualProducts;
      } else if (section.selectionType === 'condition') {
        let query = {};
        if (section.category) {
          query.category = section.category;
        }
        switch (section.condition) {
          case 'Featured':
            query = { isFeatured: true };
            break;
          case 'Best Selling':
            query = { isBestSelling: true };
            break;
          case 'New Arrival':
            query = { isNewArrival: true };
            // Alternatively: sort by createdAt descending
            break;
          case 'Trending':
            query = { isTrending: true };
            break;
          case 'Recommended':
            query = { isRecommended: true };
            break;
          case 'Flash Sale':
            query = { isFlashSale: true };
            break;
          default:
            break;
        }
        
        // Fetch up to 20 products for the condition
        if (Object.keys(query).length > 0) {
          products = await Product.find(query).limit(20);
        }
      }

      formattedSections.push({
        slug: section.slug,
        title: section.title,
        display_order: section.display_order,
        condition: section.condition,
        category: section.category,
        products: products
      });
    }

    res.status(200).json({ success: true, sections: formattedSections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all home sections (Admin)
// @route   GET /api/homesections
// @access  Private/Admin
export const getAdminHomeSections = async (req, res) => {
  try {
    const sections = await HomeSection.find({}).sort({ display_order: 1 }).populate('manualProducts', 'name price image status');
    res.status(200).json({ success: true, data: sections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a home section (Admin)
// @route   POST /api/homesections
// @access  Private/Admin
export const createHomeSection = async (req, res) => {
  try {
    const section = new HomeSection(req.body);
    const createdSection = await section.save();
    res.status(201).json({ success: true, message: 'Section created successfully', data: createdSection });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a home section (Admin)
// @route   PUT /api/homesections/:id
// @access  Private/Admin
export const updateHomeSection = async (req, res) => {
  try {
    const section = await HomeSection.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    if (section) {
      res.status(200).json({ success: true, message: 'Section updated successfully', data: section });
    } else {
      res.status(404).json({ success: false, message: 'Section not found' });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a home section (Admin)
// @route   DELETE /api/homesections/:id
// @access  Private/Admin
export const deleteHomeSection = async (req, res) => {
  try {
    const section = await HomeSection.findByIdAndDelete(req.params.id);
    if (section) {
      res.status(200).json({ success: true, message: 'Section removed' });
    } else {
      res.status(404).json({ success: false, message: 'Section not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get a single home section by slug with all products
// @route   GET /api/homesections/public/:slug
// @access  Public
export const getPublicHomeSectionBySlug = async (req, res) => {
  try {
    const section = await HomeSection.findOne({ slug: req.params.slug, isActive: true }).populate('manualProducts');
    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }

    let products = [];
    if (section.selectionType === 'manual') {
      products = section.manualProducts;
    } else if (section.selectionType === 'condition') {
      let query = {};
      if (section.category) {
        query.category = section.category;
      }
      switch (section.condition) {
        case 'Featured': query = { ...query, isFeatured: true }; break;
        case 'Best Selling': query = { ...query, isBestSelling: true }; break;
        case 'New Arrival': query = { ...query, isNewArrival: true }; break;
        case 'Trending': query = { ...query, isTrending: true }; break;
        case 'Recommended': query = { ...query, isRecommended: true }; break;
        case 'Flash Sale': query = { ...query, isFlashSale: true }; break;
        default: break;
      }
      
      if (Object.keys(query).length > 0) {
        products = await Product.find(query); // No limit for dedicated page
      }
    }

    const formattedSection = {
      slug: section.slug,
      title: section.title,
      display_order: section.display_order,
      condition: section.condition,
      category: section.category,
      products: products
    };

    res.status(200).json({ success: true, data: formattedSection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
