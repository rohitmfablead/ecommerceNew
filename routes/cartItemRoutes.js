import express from 'express';
import {
  getCartItems,
  getCartItemById,
  createCartItem,
  updateCartItem,
  deleteCartItem,
  addToMyCart,
  getMyCartItems
} from '../controllers/cartItemController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/mycart')
  .get(protect, getMyCartItems)
  .post(protect, addToMyCart);

router.route('/')
  .get(getCartItems)
  .post(createCartItem);

router.route('/:id')
  .get(getCartItemById)
  .put(updateCartItem)
  .delete(deleteCartItem);

export default router;
