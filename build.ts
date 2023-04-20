import { build, BuildOptions } from 'esbuild';

const entryFile = './src/render.ts';
const shared: BuildOptions = {
  bundle: true,
  entryPoints: [entryFile],
  logLevel: 'info',
  minify: true,
  sourcemap: true,
  plugins: [],
};

build({
  ...shared,
  format: 'esm',
  outfile: './dist/index.esm.js',
  target: ['esnext'],
});
