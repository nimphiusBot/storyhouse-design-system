const fs = require('fs');
const path = require('path');

const files = [
  'package.json',
  'packages/components/package.json',
  'packages/utils/package.json',
  'packages/storybook/package.json',
  'packages/docs/package.json'
];

for (const file of files) {
  console.log(`\nChecking ${file}...`);
  const filePath = path.join(__dirname, '..', file);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    JSON.parse(content);
    console.log('✓ Valid JSON');
  } catch (error) {
    console.log('✗ Invalid JSON:', error.message);
    
    // Show context around error
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    console.log('Lines around error:');
    for (let i = Math.max(0, error.lineNumber - 3); i < Math.min(lines.length, error.lineNumber + 2); i++) {
      console.log(`${i + 1}: ${lines[i]}`);
    }
  }
}