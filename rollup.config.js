import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

export default {
    input: 'src/index.ts',
    output: {
        file: 'lib/index.js',
        format: 'umd',
        name: 'SjsBaseModel',
        sourcemap: true,
        globals: {}
    },
    plugins: [
        typescript(),
        resolve({jsnext: true}),
        commonjs(),
        uglify()
    ],
    external: []
};
