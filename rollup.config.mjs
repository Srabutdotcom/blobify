import terser from '@rollup/plugin-terser';
export default [
  {
    input: './src/mod.js',
    output: {
      //dir: 'dist',
      file: 'dist/blobify.deno.bundle.js',
      format: 'es', // Use ES module format,
      //chunkFileNames: '[name]-[hash].js'
    },
    plugins: [
      terser(), // Minify the output bundle
    ],
  },
  {
    //input: ['./src/blobify.js','./src/parseblob.js'],
    input: './src/mod.client.js',
    output: {
      //dir: 'dist',
      file: 'dist/blobify.client.bundle.js',
      format: 'es', // Use ES module format,
      //chunkFileNames: '[name]-client.bundle.js'
    },
    plugins: [
      terser(), // Minify the output bundle
    ],
  },
];

//run code -->
//npx rollup -c rollup.config.js
//or
//npx rollup -c