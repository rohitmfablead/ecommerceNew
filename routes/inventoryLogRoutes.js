import express from 'express';
import {
  getInventoryLogs,
  getInventoryLogById,
  createInventoryLog,
  updateInventoryLog,
  deleteInventoryLog,
} from '../controllers/inventoryLogController.js';

const router = express.Router();

router.route('/')
  .get(getInventoryLogs)
  .post(createInventoryLog);

router.route('/:id')
  .get(getInventoryLogById)
  .put(updateInventoryLog)
  .delete(deleteInventoryLog);

export default router;
