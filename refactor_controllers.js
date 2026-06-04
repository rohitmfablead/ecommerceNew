import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const controllersDir = path.join(__dirname, 'controllers');

fs.readdirSync(controllersDir).forEach(file => {
  if (!file.endsWith('.js')) return;
  const filePath = path.join(controllersDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // 1. Array responses (ends with 's' like items, products)
  // We'll be specific to avoid replacing random things
  content = content.replace(/res\.json\((items|products|users|orders|categories|brands|coupons|vendors|reviews|banners|blogs|pages|notifications|methods|payments|admins|logs|sections|contents)\);/g, 
    "res.status(200).json({ success: true, message: 'Retrieved successfully', count: $1.length, data: $1 });");

  // 2. Error responses with status code
  content = content.replace(/res\.status\((4\d\d|5\d\d)\)\.json\(\{\s*message:\s*([^}]+)\s*\}\);/g, 
    "res.status($1).json({ success: false, message: $2 });");

  // 3. Success message responses (like delete)
  // e.g. res.json({ message: 'Product removed' });
  content = content.replace(/res\.json\(\{\s*message:\s*([^}]+)\s*\}\);/g, 
    "res.status(200).json({ success: true, message: $1 });");

  // 4. Create responses (status 201)
  content = content.replace(/res\.status\(201\)\.json\(([a-zA-Z0-9_]+)\);/g, 
    "res.status(201).json({ success: true, message: 'Created successfully', data: $1 });");

  // 5. Single item responses (fallback for res.json(item) or res.json(product))
  // e.g. res.json(item); res.json(product);
  content = content.replace(/res\.json\(([a-zA-Z0-9_]+)\);/g, 
    "res.status(200).json({ success: true, message: 'Retrieved successfully', data: $1 });");

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('Controllers refactored successfully.');
