import express from 'express';
import {
  getAdminHomeSections,
  getPublicHomeSections,
  createHomeSection,
  updateHomeSection,
  deleteHomeSection,
  getPublicHomeSectionBySlug,
} from '../controllers/homeSectionController.js';

const router = express.Router();

router.get('/public', getPublicHomeSections);
router.get('/public/:slug', getPublicHomeSectionBySlug);

router.route('/')
  .get(getAdminHomeSections)
  .post(createHomeSection);

router.route('/:id')
  .put(updateHomeSection)
  .delete(deleteHomeSection);

export default router;
