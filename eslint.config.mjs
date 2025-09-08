import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'prettier'
  ),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  {
    rules: {
      'quotes': ['warn', 'single'],
      'semi': ['warn', 'always'],
      'arrow-body-style': ['warn', 'always'],
      'camelcase': ['warn'],
      'capitalized-comments': ['warn'],
      'default-case': ['error'],
      'dot-notation': ['warn'],
    }
  }
];

export default eslintConfig;
