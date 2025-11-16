import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../app/assets/icons');
const outputFile = path.join(__dirname, '../public/icons-sprite.svg');

// Читаем все SVG файлы из папки icons
const svgFiles = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));

let spriteContent = '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n';

svgFiles.forEach(file => {
  const filePath = path.join(iconsDir, file);
  const svgContent = fs.readFileSync(filePath, 'utf-8');
  
  // Извлекаем имя файла без расширения
  const iconName = path.basename(file, '.svg');
  
  // Извлекаем viewBox из оригинального SVG
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/i);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
  
  // Извлекаем содержимое SVG (все что внутри <svg> тега)
  const contentMatch = svgContent.match(/<svg[^>]*>(.*?)<\/svg>/is);
  const innerContent = contentMatch ? contentMatch[1] : '';
  
  // Создаем symbol с id="icon-{name}"
  spriteContent += `  <symbol id="icon-${iconName}" viewBox="${viewBox}">\n`;
  spriteContent += `    ${innerContent.trim()}\n`;
  spriteContent += `  </symbol>\n`;
});

spriteContent += '</svg>';

// Записываем спрайт в public папку
fs.writeFileSync(outputFile, spriteContent, 'utf-8');

console.log(`✅ SVG спрайт создан: ${outputFile}`);
console.log(`📦 Иконок в спрайте: ${svgFiles.length}`);
console.log(`📝 Иконки: ${svgFiles.map(f => path.basename(f, '.svg')).join(', ')}`);

