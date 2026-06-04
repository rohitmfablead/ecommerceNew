import express from 'express';
import {
  getWishlistItems,
  getWishlistItemById,
  createWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
} from '../controllers/wishlistItemController.js';

const router = express.Router();

router.route('/')
  .get(getWishlistItems)
  .post(createWishlistItem);

router.route('/:id')
  .get(getWishlistItemById)
  .put(updateWishlistItem)
  .delete(deleteWishlistItem);

export default router;
