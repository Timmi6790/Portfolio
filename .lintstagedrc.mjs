export default {
  '*.{js,jsx,ts,tsx,mjs,cjs}': ['eslint --fix', 'prettier --write'],
  '**/*.{ts,tsx}': () => 'bun type-check',
  '*.{json,css,md,yaml,yml}': 'prettier --write',
}
