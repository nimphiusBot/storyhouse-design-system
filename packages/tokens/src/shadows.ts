/**
 * Shadow, elevation, and border-radius design tokens for Storyhouse Design System
 */

export const boxShadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
} as const;

export const dropShadow = {
  sm: '0 1px 1px rgb(0 0 0 / 0.05)',
  base: '0 1px 2px rgb(0 0 0 / 0.15)',
  md: '0 3px 3px rgb(0 0 0 / 0.12)',
  lg: '0 4px 4px rgb(0 0 0 / 0.15)',
  xl: '0 9px 7px rgb(0 0 0 / 0.1)',
} as const;

export const opacity = {
  0: '0',
  5: '0.05',
  10: '0.1',
  15: '0.15',
  20: '0.2',
  25: '0.25',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  75: '0.75',
  80: '0.8',
  90: '0.9',
  95: '0.95',
  100: '1',
} as const;