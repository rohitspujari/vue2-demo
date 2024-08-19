// import { defineConfig } from 'vite';
// import { createVuePlugin } from 'vite-plugin-vue2';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [createVuePlugin()],
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           'react-semaphor': ['react-semaphor'],
//         },
//       },
//     },
//     chunkSizeWarningLimit: 1200,
//     // chunkSizeWarningLimit: 1000,
//   },
// });

import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

import path from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin(),
    dts({
      // insertTypesEntry: true,
      // cleanVueFileName: true,
      // outDir: 'dist/types',
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/components/index.ts'),
      name: 'vue2-semaphor',
      fileName: 'vue2-semaphor',
    },
    rollupOptions: {
      external: ['vue', 'tailwindcss'],
      output: {
        globals: {
          vue: 'Vue',
          tailwindcss: 'tailwindcss',
        },
      },

      onLog(level, log, handler) {
        if (
          log.cause &&
          (log.cause as Error)?.message ===
            `Can't resolve original location of error.`
        ) {
          return;
        }
        handler(level, log);
      },
    },
    // sourcemap: true,
    emptyOutDir: true,
  },
});
