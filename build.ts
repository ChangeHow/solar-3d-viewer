import { build } from 'bun';

await build({
  entrypoints: ['./src/main.ts'],
  outdir: './dist',
  target: 'browser',
  format: 'esm',
  sourcemap: 'inline',
  minify: true
});

console.log('Build complete! Output: ./dist');
