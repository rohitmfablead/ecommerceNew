import express from 'express';
import {
  getShippingMethods,
  getShippingMethodById,
  createShippingMethod,
  updateShippingMethod,
  deleteShippingMethod,
} from '../controllers/shippingMethodController.js';

const router = express.Router();

router.route('/')
  .get(getShippingMethods)
  .post(createShippingMethod);

router.route('/:id')
  .get(getShippingMethodById)
  .put(updateShippingMethod)
  .delete(deleteShippingMethod);

export default router;
