import UnpluginTypia from '@ryoppippi/unplugin-typia/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnpluginTypia(),
  ],
});
