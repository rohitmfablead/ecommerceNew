import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, message: 'Retrieved successfully', count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: product });
    } else {
      res.status(404).json({ success: false, message: 'Product not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Public
export const createProduct = async (req, res) => {
  try {
    const { name, brand, category, price, stock, status } = req.body;
    let image = '';
    
    if (req.file) {
      // Store the path to the uploaded file
      image = `/uploads/${req.file.filename}`;
    }

    const product = new Product({
      name,
      brand,
      category,
      price,
      stock,
      status,
      image,
    });

    const createdProduct = await product.save();
    res.status(201).json({ success: true, message: 'Created successfully', data: createdProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public
export const updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (product) {
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: product });
    } else {
      res.status(404).json({ success: false, message: 'Product not found'  });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message  });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.status(200).json({ success: true, message: 'Product removed'  });
    } else {
      res.status(404).json({ success: false, message: 'Product not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
