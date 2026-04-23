#!/usr/bin/env node

console.log('🧱 Bootstrapping Design System Platform...')
console.log('==========================================')

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Create directory structure
const directories = [
  'packages/components',
  'packages/utils',
  'packages/docs',
  'packages/storybook',
  '.github/workflows',
  'scripts'
]

directories.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir)
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true })
    console.log(`📁 Created: ${dir}`)
  }
})

// Create basic files
const files = {
  'tsconfig.base.json': `{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react-jsx"
  },
  "exclude": ["node_modules", "dist"]
}`,
  'turbo.json': `{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "clean": {
      "cache": false
    }
  }
}`,
  '.prettierrc': `{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2
}`,
  '.gitignore': `node_modules
dist
*.log
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
coverage
.vercel
.next
out
`
}

Object.entries(files).forEach(([filename, content]) => {
  const fullPath = path.join(__dirname, '..', filename)
  fs.writeFileSync(fullPath, content)
  console.log(`📄 Created: ${filename}`)
})

// Create first component package
const componentPackage = {
  name: "@storyhouse/components",
  version: "0.1.0",
  description: "Design system components",
  main: "./dist/index.js",
  module: "./dist/index.mjs",
  types: "./dist/index.d.ts",
  scripts: {
    "build": "vite build",
    "dev": "vite build --watch",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "test": "vitest"
  },
  dependencies: {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  devDependencies: {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "eslint": "^8.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0"
  }
}

const componentPath = path.join(__dirname, '..', 'packages/components')
fs.writeFileSync(
  path.join(componentPath, 'package.json'),
  JSON.stringify(componentPackage, null, 2)
)

// Create first component
const buttonComponent = `import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@storyhouse/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
            'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
            'hover:bg-gray-100': variant === 'ghost',
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
`

fs.writeFileSync(
  path.join(componentPath, 'src', 'Button.tsx'),
  buttonComponent
)

console.log('✅ Bootstrap complete!')
console.log('')
console.log('Next steps:')
console.log('1. Run: npm install')
console.log('2. Run: npm run build')
console.log('3. Run: npm run storybook')
console.log('')
console.log('Design System Platform ready for development.')