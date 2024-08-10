import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// // Set environment variables as global variables
// const envVars = {};
// for (const key of Object.keys(process.env)) {
//   envVars[`import.meta.env.${key}`] = JSON.stringify(process.env[key]);
// }

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   define: envVars,
//   build: {
//     sourcemap: true,
//   },
// });