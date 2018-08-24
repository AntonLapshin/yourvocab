import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    format: 'iife',
    file: 'bin/inject.js',
    name: 'yourvocab'
  },
  plugins: [
    resolve(),
    commonjs({
      exclude: [],
      include: [
        'node_modules/**'
      ]
    })
  ]
};
