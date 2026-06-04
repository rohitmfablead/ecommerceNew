import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
// import { protect } from '../middleware/authMiddleware.js'; // Use if you want it protected

const router = express.Router();

router.route('/').get(getDashboardStats); // optionally add protect middleware here

export default router;
