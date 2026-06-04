import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

const schemas = {
  Category: `{ name: String, icon: String, count: { type: Number, default: 0 } }`,
  Order: `{ customer: String, email: String, date: String, items: Number, total: Number, status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' } }`,
  User: `{ name: String, email: { type: String, unique: true }, phone: String, orders: { type: Number, default: 0 }, joined: String, status: { type: String, enum: ['Active', 'Blocked'], default: 'Active' } }`,
  Coupon: `{ code: { type: String, unique: true }, discountType: { type: String, enum: ['percent', 'flat'] }, value: Number, expires: String, usage: { type: Number, default: 0 }, status: { type: String, enum: ['Active', 'Expired', 'Scheduled'], default: 'Active' } }`,
  Vendor: `{ name: String, email: { type: String, unique: true }, products: { type: Number, default: 0 }, sales: { type: Number, default: 0 }, status: { type: String, enum: ['Approved', 'Pending', 'Rejected'], default: 'Pending' } }`,
  Review: `{ product: String, customer: String, rating: Number, comment: String, status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }, date: String }`,
  Banner: `{ title: String, subtitle: String, image: String, link: String, active: { type: Boolean, default: true }, position: { type: String, enum: ['Hero', 'Strip', 'Sidebar'] } }`,
  Blog: `{ title: String, author: String, date: String, status: { type: String, enum: ['Published', 'Draft'], default: 'Draft' }, excerpt: String }`,
  CmsPage: `{ slug: { type: String, unique: true }, title: String, content: String, updated: String }`,
  Notification: `{ channel: { type: String, enum: ['Email', 'Push'] }, title: String, sent: String, recipients: { type: Number, default: 0 }, status: { type: String, enum: ['Sent', 'Scheduled', 'Draft'], default: 'Draft' } }`,
  ShippingMethod: `{ name: String, cost: Number, eta: String, active: { type: Boolean, default: true } }`,
  Payment: `{ order: String, method: { type: String, enum: ['UPI', 'Card', 'COD', 'Wallet', 'NetBanking'] }, amount: Number, status: { type: String, enum: ['Paid', 'Refunded', 'Pending', 'Failed'], default: 'Pending' }, date: String }`,
  Admin: `{ name: String, email: { type: String, unique: true }, role: { type: String, default: 'Admin' }, status: { type: String, enum: ['Active', 'Disabled'], default: 'Active' }, lastLogin: String }`,
  CartItem: `{ user: String, product: String, quantity: Number, price: Number }`,
  WishlistItem: `{ user: String, product: String, addedOn: String }`,
  InventoryLog: `{ product: String, change: Number, reason: { type: String, enum: ['Restock', 'Sale', 'Return', 'Damage', 'Adjustment'] }, date: String }`,
  CmsSection: `{ page: String, section: String, title: String, subtitle: String, buttonText: String, buttonLink: String, isActive: { type: Boolean, default: true }, displayOrder: Number }`,
  CmsPageContent: `{ slug: { type: String, unique: true }, pageTitle: String, pageDescription: String, bannerTitle: String, bannerDescription: String, buttonText: String, buttonLink: String, metaTitle: String, metaDescription: String }`
};

Object.keys(schemas).forEach(entity => {
  const schemaDef = schemas[entity];
  const content = `import mongoose from 'mongoose';

const schema = mongoose.Schema(
  ${schemaDef},
  { timestamps: true }
);

const ${entity} = mongoose.model('${entity}', schema);

export default ${entity};
`;
  fs.writeFileSync(path.join(__dirname, 'models', `${entity}.js`), content);
});

console.log('Schemas updated with real fields.');
