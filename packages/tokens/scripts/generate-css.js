/**
 * Generates tokens.css from the design token source files.
 * Creates CSS custom properties that mirror the JS token structure.
 *
 * Run via: node scripts/generate-css.js
 * Output: dist/tokens.css
 */
const fs = require('fs');
const path = require('path');

// -------------------------------------------------------------------
// Token data — kept in sync with src/*.ts
// -------------------------------------------------------------------
const tokens = {
  colors: {
    'brand-orange': [
      ['50', '#fff7ed'],
      ['100', '#ffedd5'],
      ['200', '#fed7aa'],
      ['300', '#fdba74'],
      ['400', '#fb923c'],
      ['500', '#f97316'],
      ['600', '#ea580c'],
      ['700', '#c2410c'],
      ['800', '#9a3412'],
      ['900', '#7c2d12'],
      ['950', '#431407'],
    ],
    gray: [
      ['50', '#fafafa'],
      ['100', '#f5f5f5'],
      ['200', '#e5e5e5'],
      ['300', '#d4d4d4'],
      ['400', '#a3a3a3'],
      ['500', '#737373'],
      ['600', '#525252'],
      ['700', '#404040'],
      ['800', '#262626'],
      ['900', '#171717'],
      ['950', '#0a0a0a'],
    ],
    success: [
      ['50', '#f0fdf4'],
      ['100', '#dcfce7'],
      ['200', '#bbf7d0'],
      ['300', '#86efac'],
      ['400', '#4ade80'],
      ['500', '#22c55e'],
      ['600', '#16a34a'],
      ['700', '#15803d'],
      ['800', '#166534'],
      ['900', '#14532d'],
    ],
    warning: [
      ['50', '#fffbeb'],
      ['100', '#fef3c7'],
      ['200', '#fde68a'],
      ['300', '#fcd34d'],
      ['400', '#fbbf24'],
      ['500', '#f59e0b'],
      ['600', '#d97706'],
      ['700', '#b45309'],
      ['800', '#92400e'],
      ['900', '#78350f'],
    ],
    danger: [
      ['50', '#fef2f2'],
      ['100', '#fee2e2'],
      ['200', '#fecaca'],
      ['300', '#fca5a5'],
      ['400', '#f87171'],
      ['500', '#ef4444'],
      ['600', '#dc2626'],
      ['700', '#b91c1c'],
      ['800', '#991b1b'],
      ['900', '#7f1d1d'],
    ],
    info: [
      ['50', '#eff6ff'],
      ['100', '#dbeafe'],
      ['200', '#bfdbfe'],
      ['300', '#93c5fd'],
      ['400', '#60a5fa'],
      ['500', '#3b82f6'],
      ['600', '#2563eb'],
      ['700', '#1d4ed8'],
      ['800', '#1e40af'],
      ['900', '#1e3a8a'],
    ],
  },
  spacing: [
    ['0', '0px'],
    ['px', '1px'],
    ['0.5', '0.125rem'],
    ['1', '0.25rem'],
    ['1.5', '0.375rem'],
    ['2', '0.5rem'],
    ['2.5', '0.625rem'],
    ['3', '0.75rem'],
    ['3.5', '0.875rem'],
    ['4', '1rem'],
    ['5', '1.25rem'],
    ['6', '1.5rem'],
    ['7', '1.75rem'],
    ['8', '2rem'],
    ['9', '2.25rem'],
    ['10', '2.5rem'],
    ['11', '2.75rem'],
    ['12', '3rem'],
    ['14', '3.5rem'],
    ['16', '4rem'],
    ['20', '5rem'],
    ['24', '6rem'],
    ['28', '7rem'],
    ['32', '8rem'],
    ['36', '9rem'],
    ['40', '10rem'],
    ['44', '11rem'],
    ['48', '12rem'],
    ['52', '13rem'],
    ['56', '14rem'],
    ['60', '15rem'],
    ['64', '16rem'],
    ['72', '18rem'],
    ['80', '20rem'],
    ['96', '24rem'],
  ],
  boxShadow: [
    ['sm', '0 1px 2px 0 rgb(0 0 0 / 0.05)'],
    ['base', '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'],
    ['md', '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'],
    ['lg', '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'],
    ['xl', '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'],
    ['2xl', '0 25px 50px -12px rgb(0 0 0 / 0.25)'],
    ['inner', 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'],
    ['none', 'none'],
  ],
  dropShadow: [
    ['sm', '0 1px 1px rgb(0 0 0 / 0.05)'],
    ['base', '0 1px 2px rgb(0 0 0 / 0.15)'],
    ['md', '0 3px 3px rgb(0 0 0 / 0.12)'],
    ['lg', '0 4px 4px rgb(0 0 0 / 0.15)'],
    ['xl', '0 9px 7px rgb(0 0 0 / 0.1)'],
  ],
  borderRadius: [
    ['none', '0px'],
    ['sm', '0.125rem'],
    ['base', '0.25rem'],
    ['md', '0.375rem'],
    ['lg', '0.5rem'],
    ['xl', '0.75rem'],
    ['2xl', '1rem'],
    ['3xl', '1.5rem'],
    ['full', '9999px'],
  ],
  fontSize: [
    ['xs', '0.75rem'],
    ['sm', '0.875rem'],
    ['base', '1rem'],
    ['lg', '1.125rem'],
    ['xl', '1.25rem'],
    ['2xl', '1.5rem'],
    ['3xl', '1.875rem'],
    ['4xl', '2.25rem'],
    ['5xl', '3rem'],
    ['6xl', '3.75rem'],
  ],
  fontWeight: [
    ['thin', '100'],
    ['extralight', '200'],
    ['light', '300'],
    ['normal', '400'],
    ['medium', '500'],
    ['semibold', '600'],
    ['bold', '700'],
    ['extrabold', '800'],
    ['black', '900'],
  ],
  lineHeight: [
    ['none', '1'],
    ['tight', '1.25'],
    ['snug', '1.375'],
    ['normal', '1.5'],
    ['relaxed', '1.625'],
    ['loose', '2'],
  ],
  letterSpacing: [
    ['tighter', '-0.05em'],
    ['tight', '-0.025em'],
    ['normal', '0em'],
    ['wide', '0.025em'],
    ['wider', '0.05em'],
    ['widest', '0.1em'],
  ],
  opacity: [
    ['0', '0'],
    ['5', '0.05'],
    ['10', '0.1'],
    ['15', '0.15'],
    ['20', '0.2'],
    ['25', '0.25'],
    ['30', '0.3'],
    ['40', '0.4'],
    ['50', '0.5'],
    ['60', '0.6'],
    ['70', '0.7'],
    ['75', '0.75'],
    ['80', '0.8'],
    ['90', '0.9'],
    ['95', '0.95'],
    ['100', '1'],
  ],
};

// -------------------------------------------------------------------
// CSS generation helpers
// -------------------------------------------------------------------

function cssProp(category, key, value) {
  return `  --${category}-${key}: ${value};`;
}

function cssPropBlock(category, entries) {
  return entries.map(([key, value]) => cssProp(category, key, value)).join('\n');
}

// -------------------------------------------------------------------
// Build the CSS
// -------------------------------------------------------------------

const cssLines = [
  '/*',
  ' * Storyhouse Design System — Design Tokens',
  ' * Auto-generated from packages/tokens/src/',
  ' * Do not edit directly.',
  ' */',
  '',
  '/* Brand & Semantic Colors */',
  ':root {',
];

// Colors
for (const [family, shades] of Object.entries(tokens.colors)) {
  for (const [shade, value] of shades) {
    cssLines.push(cssProp('color', `${family}-${shade}`, value));
  }
}
cssLines.push(cssProp('color', 'white', '#ffffff'));
cssLines.push(cssProp('color', 'black', '#0a0a0a'));

cssLines.push('');
cssLines.push('  /* Typography — Font Family */');
cssLines.push("  --font-family-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;");
cssLines.push("  --font-family-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;");
cssLines.push("  --font-family-serif: Georgia, Cambria, 'Times New Roman', Times, serif;");

cssLines.push('');
cssLines.push('  /* Typography — Font Size */');
cssLines.push(cssPropBlock('font-size', tokens.fontSize));

cssLines.push('');
cssLines.push('  /* Typography — Font Weight */');
cssLines.push(cssPropBlock('font-weight', tokens.fontWeight));

cssLines.push('');
cssLines.push('  /* Typography — Line Height */');
cssLines.push(cssPropBlock('line-height', tokens.lineHeight));

cssLines.push('');
cssLines.push('  /* Typography — Letter Spacing */');
cssLines.push(cssPropBlock('letter-spacing', tokens.letterSpacing));

cssLines.push('');
cssLines.push('  /* Spacing (4px grid — 1 unit = 0.25rem) */');
cssLines.push(cssPropBlock('spacing', tokens.spacing));

cssLines.push('');
cssLines.push('  /* Box Shadows */');
cssLines.push(cssPropBlock('shadow', tokens.boxShadow));

cssLines.push('');
cssLines.push('  /* Drop Shadow (filter) */');
cssLines.push(cssPropBlock('drop-shadow', tokens.dropShadow));

cssLines.push('');
cssLines.push('  /* Border Radius */');
cssLines.push(cssPropBlock('radius', tokens.borderRadius));

cssLines.push('');
cssLines.push('  /* Opacity */');
cssLines.push(cssPropBlock('opacity', tokens.opacity));

cssLines.push('}');

// -------------------------------------------------------------------
// Write output
// -------------------------------------------------------------------
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const outputPath = path.join(distDir, 'tokens.css');
fs.writeFileSync(outputPath, cssLines.join('\n') + '\n', 'utf8');
console.log(`✓ Generated tokens.css (${cssLines.length} lines)`);
