import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage', 'storybook-static', 'packages/storybook/storybook-static'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'error',
      // Require explicit return types on exported functions only.
      // Internal handlers/callbacks benefit from type inference.
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
        },
      ],
    },
  },
  // Looser rules for component internals: callback return types
  // are inferred, not required on every arrow function.
  {
    files: ['packages/components/src/**/*.ts', 'packages/components/src/**/*.tsx'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
        },
      ],
    },
  },
  // Allow `any` in story/storybook config files (common Storybook patterns)
  {
    files: ['**/*.stories.tsx', '**/.storybook/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // Stories often use hooks inside template functions — that's a Storybook pattern, not a react-hooks violation
      'react-hooks/rules-of-hooks': 'off',
      // Story imports often include unused references for storybook context
      '@typescript-eslint/no-unused-vars': 'off',
      // Story function render args don't need return types
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  }
);
