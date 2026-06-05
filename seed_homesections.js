import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import HomeSection from './models/HomeSection.js';

dotenv.config();

const seedSections = async () => {
  await connectDB();
  
  const sections = [
    { title: 'Featured Products', slug: 'featured-products', display_order: 1, selectionType: 'condition', condition: 'Featured', isActive: true },
    { title: 'Flash Sale', slug: 'flash-sale', display_order: 2, selectionType: 'condition', condition: 'Flash Sale', isActive: true },
    { title: 'Best Sellers', slug: 'best-sellers', display_order: 3, selectionType: 'condition', condition: 'Best Selling', isActive: true },
    { title: 'New Arrivals', slug: 'new-arrivals', display_order: 4, selectionType: 'condition', condition: 'New Arrival', isActive: true },
    { title: 'Trending Now', slug: 'trending-now', display_order: 5, selectionType: 'condition', condition: 'Trending', isActive: true },
    { title: 'Recommended For You', slug: 'recommended', display_order: 6, selectionType: 'condition', condition: 'Recommended', isActive: true },
  ];

  try {
    await HomeSection.deleteMany({});
    console.log('Existing sections deleted');
    await HomeSection.insertMany(sections);
    console.log('6 sections inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding sections:', error);
    process.exit(1);
  }
};

seedSections();
