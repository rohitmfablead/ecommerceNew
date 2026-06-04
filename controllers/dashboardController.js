import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Get dashboard statistics
// @route   GET /api/dashboard
// @access  Public (or Private depending on your setup)
export const getDashboardStats = async (req, res) => {
  try {
    // 1. Total Users
    const totalUsers = await User.countDocuments();

    // 2. Total Orders
    const totalOrders = await Order.countDocuments();

    // 3. Total Products
    const totalProducts = await Product.countDocuments();

    // 4. Total Revenue (sum of total field in Orders)
    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' }
        }
      }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // 5. Recent Orders (last 5)
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    // 6. Revenue over time (e.g. by month for chart) - Optional but good for dashboards
    const revenueByMonth = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$total" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: {
        totalUsers,
        totalOrders,
        totalProducts,
        totalRevenue,
        recentOrders,
        revenueByMonth
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message  });
  }
};
