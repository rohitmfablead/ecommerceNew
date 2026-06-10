import Product from '../models/Product.js';
import Category from '../models/Category.js';
import CartItem from '../models/CartItem.js';
import WishlistItem from '../models/WishlistItem.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { category, subcategory, brand, color, rating, minPrice, maxPrice, search, sort, condition } = req.query;

    let query = {};
    if (category) query.category = { $in: category.split(',') };
    if (subcategory) query.subcategory = { $in: subcategory.split(',') };
    if (brand) query.brand = { $in: brand.split(',') };
    if (color) query['variations.color'] = { $in: color.split(',') };
    if (rating) query.averageRating = { $gte: Number(rating) };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) query.name = { $regex: search, $options: 'i' };
    
    if (condition) {
      switch (condition) {
        case 'Featured': query.isFeatured = true; break;
        case 'Best Selling': query.isBestSelling = true; break;
        case 'New Arrival': query.isNewArrival = true; break;
        case 'Trending': query.isTrending = true; break;
        case 'Recommended': query.isRecommended = true; break;
        case 'Flash Sale': query.isFlashSale = true; break;
      }
    }

    let sortObj = {};
    if (sort === 'low') sortObj.price = 1;
    else if (sort === 'high') sortObj.price = -1;
    else if (sort === 'rating') sortObj.averageRating = -1;
    else if (sort === 'newest') sortObj.createdAt = -1;

    const products = await Product.find(query).sort(sortObj);
    
    let productsData = products.map(p => p.toObject());
    
    if (req.user) {
      const cartItems = await CartItem.find({ user: req.user._id });
      const wishlistItems = await WishlistItem.find({ user: req.user._id });
      
      const cartProductIds = cartItems.map(item => item.product.toString());
      const wishlistProductIds = wishlistItems.map(item => item.product.toString());

      productsData = productsData.map(p => ({
        ...p,
        inCart: cartProductIds.includes(p._id.toString()),
        isWishlisted: wishlistProductIds.includes(p._id.toString())
      }));
    }

    res.status(200).json({ success: true, message: 'Retrieved successfully', count: productsData.length, data: productsData });
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
      let productData = product.toObject();
      if (req.user) {
        const cartItem = await CartItem.findOne({ user: req.user._id, product: product._id });
        const wishlistItem = await WishlistItem.findOne({ user: req.user._id, product: product._id });
        
        productData.inCart = !!cartItem;
        productData.isWishlisted = !!wishlistItem;
      }
      res.status(200).json({ success: true, message: 'Retrieved successfully', data: productData });
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
    
    if (category) {
      await Category.findOneAndUpdate({ name: category }, { $inc: { count: 1 } });
    }

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

    const oldProduct = await Product.findById(req.params.id);
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { returnDocument: 'after' });
    
    if (product) {
      if (oldProduct && oldProduct.category !== product.category) {
        if (oldProduct.category) {
          await Category.findOneAndUpdate({ name: oldProduct.category }, { $inc: { count: -1 } });
        }
        if (product.category) {
          await Category.findOneAndUpdate({ name: product.category }, { $inc: { count: 1 } });
        }
      }

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
      if (product.category) {
        await Category.findOneAndUpdate({ name: product.category }, { $inc: { count: -1 } });
      }

      res.status(200).json({ success: true, message: 'Product removed'  });
    } else {
      res.status(404).json({ success: false, message: 'Product not found'  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
