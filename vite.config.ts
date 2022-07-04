/*
 * @Author: your name
 * @Date: 2022-04-07 09:15:53
 * @LastEditTime: 2022-06-23 09:46:48
 * @LastEditors: Do not edit
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \graduation-projectd:\vite-project\vite.config.ts
 */
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
const path = require('path');
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        host: '127.0.0.1',
        port: 9001,
        open: true
    }
});
