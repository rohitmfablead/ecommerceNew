import express from 'express';
import { getHeaderSetting, updateHeaderSetting } from '../controllers/headerSettingController.js';

const router = express.Router();

router.route('/')
  .get(getHeaderSetting)
  .put(updateHeaderSetting);

export default router;
