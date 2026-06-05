import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';

dotenv.config();

const seedProducts = async () => {
  await connectDB();

  const cats = ['Electronics', 'Fashion', 'Home Decor', 'Beauty'];
  const sampleProducts = [];
  
  for (let i = 1; i <= 30; i++) {
    const isFeatured = i % 2 === 0;
    const isBestSelling = i % 3 === 0;
    const isNewArrival = i % 4 === 0;
    const isTrending = i % 5 === 0;
    const isRecommended = i % 6 === 0;
    const isFlashSale = i % 7 === 0;

    sampleProducts.push({
      name: `Sample Product ${i}`,
      slug: `sample-product-${i}`,
      shortDesc: `Short description for premium product ${i}`,
      longDesc: `Long description for product ${i} with more details.`,
      brand: `Brand ${i % 5 + 1}`,
      category: cats[i % cats.length],
      subcategory: `Subcategory ${i % 3}`,
      price: (i * 100) + 99,
      salePrice: isFlashSale ? (i * 80) + 99 : 0,
      stock: i * 10,
      stockStatus: 'In Stock',
      status: 'Active',
      image: `https://picsum.photos/seed/product${i}/400/400`,
      averageRating: Number((Math.random() * 2 + 3).toFixed(1)),
      totalReviews: Math.floor(Math.random() * 100),
      isFeatured,
      isBestSelling,
      isNewArrival,
      isTrending,
      isRecommended,
      isFlashSale
    });
  }

  // Ensure at least one product per condition so sections are not empty
  sampleProducts[0].isFeatured = true;
  sampleProducts[1].isBestSelling = true;
  sampleProducts[2].isNewArrival = true;
  sampleProducts[3].isTrending = true;
  sampleProducts[4].isRecommended = true;
  sampleProducts[5].isFlashSale = true;

  try {
    await Product.deleteMany({});
    console.log('Existing products deleted');
    await Product.insertMany(sampleProducts);
    console.log(`${sampleProducts.length} dummy products inserted successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
