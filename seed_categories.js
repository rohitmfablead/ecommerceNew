import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Category from './models/Category.js';

dotenv.config();

const seedCategories = async () => {
  await connectDB();

  const categories = [
    { name: 'Electronics', count: 120, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80' },
    { name: 'Fashion', count: 350, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80' },
    { name: 'Home & Kitchen', count: 85, image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80' },
    { name: 'Beauty', count: 140, image: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?w=400&q=80' },
    { name: 'Books', count: 420, image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80' },
    { name: 'Sports', count: 90, image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=80' },
  ];

  try {
    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log(`${categories.length} Categories seeded successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Categories:', error);
    process.exit(1);
  }
};

seedCategories();
