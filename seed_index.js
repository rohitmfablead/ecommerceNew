import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Banner from './models/Banner.js';
import Review from './models/Review.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce')
  .then(async () => {
    console.log('Connected to DB');

    // Seed Banners (Strip position)
    await Banner.deleteMany({ position: 'Strip' });
    await Banner.create([
      {
        title: 'Premium picks,<br/>up to 50% off',
        subtitle: 'Deal of the Day',
        link: '/shop',
        position: 'Strip',
        active: true
      },
      {
        title: 'Organic<br/>Beauty Care',
        subtitle: 'New Arrival',
        link: '/shop',
        image: 'Starting ₹299',
        position: 'Strip',
        active: true
      }
    ]);

    // Seed Reviews for Testimonials
    await Review.deleteMany({});
    await Review.create([
      {
        customer: 'Arjun S.',
        product: 'Verified Buyer',
        rating: 5,
        comment: "Fastest delivery I've ever experienced. Quality is beyond expectations!",
        status: 'Approved'
      },
      {
        customer: 'Priya M.',
        product: 'Loyal Customer',
        rating: 5,
        comment: "The product range is incredible and the return process was super smooth.",
        status: 'Approved'
      },
      {
        customer: 'Rahul K.',
        product: 'First-time Shopper',
        rating: 4,
        comment: "Honestly impressed. Will definitely shop here again. Highly recommend!",
        status: 'Approved'
      }
    ]);

    console.log('Seeding done');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
