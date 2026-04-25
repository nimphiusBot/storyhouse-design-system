const fs = require('fs');
const path = require('path');
const glob = require('glob');

const pagesDir = 'src/pages/components';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.astro') && !f.includes('.test'));

let fixed = 0;
for (const file of files) {
  const fp = path.join(pagesDir, file);
  let content = fs.readFileSync(fp, 'utf8');
  
  // Fix: remove currentPath={currentPath} from StorybookPreview calls
  // These have inconsistent indentation (2 spaces vs 6 spaces)
  const pat = /(\s*)StorybookPreview\b[\s\S]*?(?=\/>)/g;
  let match;
  let modified = false;
  
  // Simpler approach: just replace all instances of "currentPath={currentPath}"
  if (content.includes('currentPath={currentPath}')) {
    const before = content;
    content = content.replace(/\s+currentPath=\{currentPath\}\s*\n/g, '\n');
    if (before !== content) {
      console.log(`Fixed currentPath in ${file}`);
      modified = true;
    }
  }
  
  // Also fix: all StorybookPreview calls that use url= should also work (optional url)
  // Already handled by StorybookPreview change above  
  // But let's also make sure the 'url' pages are properly formatted
  
  if (modified) {
    fs.writeFileSync(fp, content);
    fixed++;
  }
}
console.log(`Fixed ${fixed} files`);
