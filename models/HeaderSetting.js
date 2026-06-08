import mongoose from 'mongoose';

const headerSettingSchema = mongoose.Schema({
  siteName: { type: String, default: 'Orva' },
  logoUrl: { type: String, default: '' },
  searchPlaceholder: { type: String, default: 'Search products, brands and more' },
  announcementText: { type: String, default: 'Free shipping over ₹499 · 10-day returns' },
  announcementLink: { type: String, default: '' },
  showAnnouncement: { type: Boolean, default: true },
  flashSaleText: { type: String, default: '🔥 Flash Sale ends in 03:24:11' },
  flashSaleLink: { type: String, default: '/shop' },
  showFlashSale: { type: Boolean, default: true },
  supportPhone: { type: String, default: '1800-300-9000' },
  supportEmail: { type: String, default: 'support@orva.com' },

  mainMenu: {
    type: [{
      id: { type: String, required: true },
      label: { type: String, required: true },
      link: { type: String, required: true },
      type: { type: String, enum: ['link', 'category'], default: 'link' },
      categoryName: { type: String, default: '' },
      displayOrder: { type: Number, default: 0 }
    }],
    default: []
  },

  navIcons: {
    type: [{
      id: { type: String, required: true },
      type: { type: String, enum: ['account', 'wishlist', 'cart', 'notifications', 'search'], required: true },
      label: { type: String, required: true },
      link: { type: String, required: true },
      icon: { type: String, required: true },
      visible: { type: Boolean, default: true },
      displayOrder: { type: Number, default: 0 }
    }],
    default: []
  }
}, { timestamps: true });

const HeaderSetting = mongoose.model('HeaderSetting', headerSettingSchema);

export default HeaderSetting;
