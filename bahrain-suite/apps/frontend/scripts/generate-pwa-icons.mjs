import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
const svgPath = path.join(iconsDir, 'app-icon.svg');

const svg = fs.readFileSync(svgPath);

for (const size of [192, 512]) {
  const out = path.join(iconsDir, `icon-${size}.png`);
  await sharp(svg, { density: 300 })
    .resize(size, size)
    .png()
    .toFile(out);
  console.log('wrote', out);
}
