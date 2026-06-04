import express from 'express';
import {
  getCmsPages,
  getCmsPageById,
  createCmsPage,
  updateCmsPage,
  deleteCmsPage,
} from '../controllers/cmsPageController.js';

const router = express.Router();

router.route('/')
  .get(getCmsPages)
  .post(createCmsPage);

router.route('/:id')
  .get(getCmsPageById)
  .put(updateCmsPage)
  .delete(deleteCmsPage);

export default router;
