import terser from '@rollup/plugin-terser';
export default {
  input: './src/mod.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es', // Use ES module format
  },
  plugins: [
    terser(), // Minify the output bundle
  ],
};

//npx rollup -c rollup.config.js