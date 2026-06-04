import express from 'express';
import {
  getCartItems,
  getCartItemById,
  createCartItem,
  updateCartItem,
  deleteCartItem,
} from '../controllers/cartItemController.js';

const router = express.Router();

router.route('/')
  .get(getCartItems)
  .post(createCartItem);

router.route('/:id')
  .get(getCartItemById)
  .put(updateCartItem)
  .delete(deleteCartItem);

export default router;
