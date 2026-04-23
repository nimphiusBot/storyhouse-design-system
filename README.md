# Storyhouse Design System

An elite design system built for scale, precision, and developer experience.

## Architecture

This is a monorepo built with Turborepo, containing:

- `packages/components` - Core React components
- `packages/utils` - Utility functions and helpers
- `packages/storybook` - Storybook instance for component development
- `packages/docs` - Documentation site built with Astro

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Development

Start all packages in development mode:

```bash
npm run dev
```

Or start individual packages:

```bash
# Start Storybook
cd packages/storybook
npm run storybook

# Start documentation site
cd packages/docs
npm run dev
```

### Building

Build all packages:

```bash
npm run build
```

### Testing

Run tests for all packages:

```bash
npm run test
```

### Linting

Lint all packages:

```bash
npm run lint
```

## Packages

### @storyhouse/components

The core component library. Each component is:

- Built with TypeScript (strict mode)
- Fully tested with Vitest and Testing Library
- Accessible by default
- Documented with Storybook

### @storyhouse/utils

Utility functions used across the design system, including:

- `cn()` - Tailwind CSS class merging utility

### @storyhouse/storybook

Storybook instance for component development and documentation.

### @storyhouse/docs

Production documentation site built with Astro and MDX.

## CI/CD

GitHub Actions workflows are configured for:

- Type checking
- Linting
- Testing
- Building all packages
- Building Storybook
- Building documentation site

## Standards

- **TypeScript:** Strict mode, no `any` types
- **Testing:** 90%+ test coverage required
- **Accessibility:** WCAG 2.1 AA compliant
- **Performance:** <2s Storybook load time
- **Documentation:** 100% component documentation coverage

## License

UNLICENSED - Proprietary software
Elite design system for Orange Doorhouse Inc
