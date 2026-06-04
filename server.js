import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import connectDB from './config/db.js';

// Import Routes
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import cmsPageRoutes from './routes/cmsPageRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import shippingMethodRoutes from './routes/shippingMethodRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cartItemRoutes from './routes/cartItemRoutes.js';
import wishlistItemRoutes from './routes/wishlistItemRoutes.js';
import inventoryLogRoutes from './routes/inventoryLogRoutes.js';
import cmsSectionRoutes from './routes/cmsSectionRoutes.js';
import cmsPageContentRoutes from './routes/cmsPageContentRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import brandRoutes from './routes/brandRoutes.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Create uploads directory if it doesn't exist
const __dirname = path.resolve();
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Make uploads folder static so we can access images in the browser
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Mount Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/cmspages', cmsPageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/shippingmethods', shippingMethodRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/cartitems', cartItemRoutes);
app.use('/api/wishlistitems', wishlistItemRoutes);
app.use('/api/inventorylogs', inventoryLogRoutes);
app.use('/api/cmssections', cmsSectionRoutes);
app.use('/api/cmspagecontents', cmsPageContentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/brands', brandRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ success: false, message: messages.join(', ') });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ success: false, message: `${field} already exists` });
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
