const { execSync } = require('child_process');
const { join } = require('path');

const packages = ['components', 'utils', 'storybook', 'docs'];

console.log('Installing root dependencies...');
try {
  execSync('npm install', { stdio: 'inherit', cwd: __dirname + '/..' });
} catch (error) {
  console.error('Failed to install root dependencies:', error.message);
  process.exit(1);
}

for (const pkg of packages) {
  console.log(`\nInstalling dependencies for ${pkg}...`);
  const pkgPath = join(__dirname, '..', 'packages', pkg);
  
  try {
    execSync('npm install', { stdio: 'inherit', cwd: pkgPath });
  } catch (error) {
    console.error(`Failed to install dependencies for ${pkg}:`, error.message);
  }
}

console.log('\nAll dependencies installed successfully!');