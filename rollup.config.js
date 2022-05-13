import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

const name = 'SjsBaseModel';
const entry = './src/index.ts';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const commonPlugins = [
  // Allows node_modules resolution
  resolve({ extensions }),

  // Allow bundling cjs modules. Rollup doesn't understand cjs
  commonjs(),

  // Compile TypeScript/JavaScript files
  babel({
    extensions,
    include: ['src/**/*'],
    runtimeHelpers: true,
  }),
];

export default [
  // For Node
  {
    input: entry,
    plugins: [...commonPlugins],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
  },
  // For Browser
  {
    input: entry,
    plugins: [...commonPlugins, uglify()],
    output: [
      {
        file: 'dist/index.iife.js',
        format: 'iife',
        name,
      },
    ],
  },
];

// https://github.com/a-tarasyuk/rollup-typescript-babel
