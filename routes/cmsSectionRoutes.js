import express from 'express';
import {
  getCmsSections,
  getCmsSectionById,
  createCmsSection,
  updateCmsSection,
  deleteCmsSection,
} from '../controllers/cmsSectionController.js';

const router = express.Router();

router.route('/')
  .get(getCmsSections)
  .post(createCmsSection);

router.route('/:id')
  .get(getCmsSectionById)
  .put(updateCmsSection)
  .delete(deleteCmsSection);

export default router;
