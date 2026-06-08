import HeaderSetting from '../models/HeaderSetting.js';

export const getHeaderSetting = async (req, res) => {
  try {
    let setting = await HeaderSetting.findOne();
    if (!setting) {
      setting = await HeaderSetting.create({});
    }
    
    // Seed default navIcons if empty
    if (!setting.navIcons || setting.navIcons.length === 0) {
      setting.navIcons = [
        { id: '1', type: 'account', label: 'Account', link: '/profile', icon: 'User', visible: true, displayOrder: 1 },
        { id: '2', type: 'notifications', label: 'Notifications', link: '/notifications', icon: 'Bell', visible: true, displayOrder: 2 },
        { id: '3', type: 'wishlist', label: 'Wishlist', link: '/wishlist', icon: 'Heart', visible: true, displayOrder: 3 },
        { id: '4', type: 'cart', label: 'Cart', link: '/cart', icon: 'ShoppingCart', visible: true, displayOrder: 4 },
      ];
      await setting.save();
    }
    
    res.json({ success: true, data: setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHeaderSetting = async (req, res) => {
  try {
    let setting = await HeaderSetting.findOne();
    if (setting) {
      setting = await HeaderSetting.findOneAndUpdate({}, req.body, { new: true, runValidators: true });
    } else {
      setting = await HeaderSetting.create(req.body);
    }
    res.json({ success: true, data: setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
