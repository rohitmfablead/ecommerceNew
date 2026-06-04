import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

const entities = [
  'Category',
  'Order',
  'User',
  'Coupon',
  'Vendor',
  'Review',
  'Banner',
  'Blog',
  'CmsPage',
  'Notification',
  'ShippingMethod',
  'Payment',
  'Admin',
  'CartItem',
  'WishlistItem',
  'InventoryLog',
  'CmsSection',
  'CmsPageContent',
];

const createModel = (entity) => {
  const content = `import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {}, // TODO: define schema fields based on mock-data.ts
  { timestamps: true, strict: false } // strict: false allows saving any fields initially
);

const ${entity} = mongoose.model('${entity}', schema);

export default ${entity};
`;
  fs.writeFileSync(path.join(__dirname, 'models', `${entity}.js`), content);
};

const createController = (entity) => {
  const lowerEntity = entity.charAt(0).toLowerCase() + entity.slice(1);
  const content = `import ${entity} from '../models/${entity}.js';

// @desc    Get all ${lowerEntity}s
// @route   GET /api/${lowerEntity}s
// @access  Public
export const get${entity}s = async (req, res) => {
  try {
    const items = await ${entity}.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single ${lowerEntity}
// @route   GET /api/${lowerEntity}s/:id
// @access  Public
export const get${entity}ById = async (req, res) => {
  try {
    const item = await ${entity}.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: '${entity} not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a ${lowerEntity}
// @route   POST /api/${lowerEntity}s
// @access  Public
export const create${entity} = async (req, res) => {
  try {
    const item = new ${entity}(req.body);
    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a ${lowerEntity}
// @route   PUT /api/${lowerEntity}s/:id
// @access  Public
export const update${entity} = async (req, res) => {
  try {
    const item = await ${entity}.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: '${entity} not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a ${lowerEntity}
// @route   DELETE /api/${lowerEntity}s/:id
// @access  Public
export const delete${entity} = async (req, res) => {
  try {
    const item = await ${entity}.findByIdAndDelete(req.params.id);
    if (item) {
      res.json({ message: '${entity} removed' });
    } else {
      res.status(404).json({ message: '${entity} not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
`;
  fs.writeFileSync(path.join(__dirname, 'controllers', `${lowerEntity}Controller.js`), content);
};

const createRoute = (entity) => {
  const lowerEntity = entity.charAt(0).toLowerCase() + entity.slice(1);
  const content = `import express from 'express';
import {
  get${entity}s,
  get${entity}ById,
  create${entity},
  update${entity},
  delete${entity},
} from '../controllers/${lowerEntity}Controller.js';

const router = express.Router();

router.route('/')
  .get(get${entity}s)
  .post(create${entity});

router.route('/:id')
  .get(get${entity}ById)
  .put(update${entity})
  .delete(delete${entity});

export default router;
`;
  fs.writeFileSync(path.join(__dirname, 'routes', `${lowerEntity}Routes.js`), content);
};

entities.forEach((entity) => {
  console.log(`Generating ${entity}...`);
  createModel(entity);
  createController(entity);
  createRoute(entity);
});

console.log('All files generated successfully.');
