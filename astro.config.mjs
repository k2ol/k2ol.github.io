// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  outDir: 'docs', // 將打包輸出的資料夾名稱改為 docs（預設為 dist）
  build: {
    format: 'file', // 輸出為 page.html 而非 page/index.html，例如 /t/time.html
  },
});