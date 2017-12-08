// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/xss.js',
  output: {
    file: 'dist/xss.js',
    format: 'umd'
  },
  watch: {
    include: 'src/xss.js'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};
