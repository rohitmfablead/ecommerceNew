import express from 'express';
import {
  getWishlistItems,
  getWishlistItemById,
  createWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
  getMyWishlist,
  addToMyWishlist,
  removeFromMyWishlist
} from '../controllers/wishlistItemController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/mywishlist')
  .get(protect, getMyWishlist)
  .post(protect, addToMyWishlist);

router.route('/mywishlist/:productId')
  .delete(protect, removeFromMyWishlist);

router.route('/')
  .get(getWishlistItems)
  .post(createWishlistItem);

router.route('/:id')
  .get(getWishlistItemById)
  .put(updateWishlistItem)
  .delete(deleteWishlistItem);

export default router;
