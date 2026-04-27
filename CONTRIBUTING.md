# Contributing to Storyhouse Design System

Thank you for your interest in contributing to the Storyhouse Design System! This document provides guidelines for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/storyhouse-design-system.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Workflow

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Start Storybook for component development
npm run storybook
```

## Code Standards

- **Components**: Use TypeScript with strict mode
- **Tests**: Write tests for all new components using React Testing Library
- **Styled Components**: Use the design system's theme tokens (colors, spacing, typography)
- **Accessibility**: All components must meet WCAG 2.1 AA standards

## Pull Request Process

1. Update the CHANGELOG.md with a description of your changes
2. Ensure all tests pass and lint is clean
3. Update Storybook stories if adding/modifying components
4. Submit a PR using the PR template
5. Request review from at least one maintainer

## Design System Tokens

Do not hardcode colors, spacing, or typography values. Use the theme tokens from `packages/tokens`:

- Colors: `theme.colors.primary`, `theme.colors.background`, etc.
- Spacing: `theme.spacing.sm`, `theme.spacing.md`, `theme.spacing.lg`
- Typography: `theme.typography.h1`, `theme.typography.body`, etc.
