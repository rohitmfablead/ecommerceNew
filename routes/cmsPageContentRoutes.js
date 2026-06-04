import express from 'express';
import {
  getCmsPageContents,
  getCmsPageContentById,
  createCmsPageContent,
  updateCmsPageContent,
  deleteCmsPageContent,
} from '../controllers/cmsPageContentController.js';

const router = express.Router();

router.route('/')
  .get(getCmsPageContents)
  .post(createCmsPageContent);

router.route('/:id')
  .get(getCmsPageContentById)
  .put(updateCmsPageContent)
  .delete(deleteCmsPageContent);

export default router;
