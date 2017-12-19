import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/index.ts',
    output: [{
        file: 'lib/index.js',
        format: 'cjs',
        sourcemap: true
    }],
    plugins: [
        typescript(),
        resolve(), // tells Rollup how to find date-fns in node_modules
        production && uglify() // minify, but only in production
    ]
};
