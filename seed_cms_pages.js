import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import CmsPageContent from './models/CmsPageContent.js'; // Assuming this exists

dotenv.config();

const seedCmsPages = async () => {
  await connectDB();

  const pages = [
    {
      slug: 'home',
      pageTitle: 'Home Page',
      pageDescription: 'Welcome to our premium eCommerce store.',
      bannerTitle: 'Spring Collection 2026',
      bannerDescription: 'Discover the latest trends and exclusive offers.',
      buttonText: 'Shop Now',
      buttonLink: '/shop',
      metaTitle: 'Home | Premium eCommerce',
      metaDescription: 'Shop the best products online with fast delivery.'
    },
    {
      slug: 'shop',
      pageTitle: 'Our Shop',
      pageDescription: 'Browse all our categories and products.',
      bannerTitle: 'All Products',
      bannerDescription: 'Everything you need in one place.',
      buttonText: 'View Categories',
      buttonLink: '/categories',
      metaTitle: 'Shop | Premium eCommerce',
      metaDescription: 'Browse our full catalog of premium products.'
    },
    {
      slug: 'about',
      pageTitle: 'About Us',
      pageDescription: 'Learn more about our company and mission.',
      bannerTitle: 'Our Story',
      bannerDescription: 'Founded in 2026 to bring you the best quality.',
      buttonText: 'Contact Us',
      buttonLink: '/contact',
      metaTitle: 'About Us | Premium eCommerce',
      metaDescription: 'Learn about our history, mission, and team.'
    },
    {
      slug: 'contact',
      pageTitle: 'Contact Us',
      pageDescription: 'Get in touch with our customer support.',
      bannerTitle: 'We are here to help',
      bannerDescription: 'Reach out to us via email or phone 24/7.',
      buttonText: 'Email Us',
      buttonLink: 'mailto:support@example.com',
      metaTitle: 'Contact Us | Premium eCommerce',
      metaDescription: 'Contact our support team for any inquiries.'
    }
  ];

  try {
    const existingCount = await CmsPageContent.countDocuments();
    if (existingCount === 0) {
      await CmsPageContent.insertMany(pages);
      console.log(`${pages.length} CMS pages inserted successfully!`);
    } else {
      console.log('CMS pages already exist. No seeding needed.');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error seeding CMS pages:', error);
    process.exit(1);
  }
};

seedCmsPages();
