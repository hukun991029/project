/*
 * @Author: your name
 * @Date: 2022-04-07 09:15:53
 * @LastEditTime: 2023-02-06 14:12:55
 * @LastEditors: Ikun
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /code/project/vite.config.ts
 */
import { defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    // const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [
            vue(),
            AutoImport({
                imports: ['vue'],
                resolvers: [ElementPlusResolver()],
                dirs: ['./composables'],
                vueTemplate: true
            })
            // Components({
            //     resolvers: [ElementPlusResolver()]
            // })
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '/image': 'src/assets/Image'
            },
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
        },
        base: './',
        server: {
            host: '127.0.0.1',
            port: 9001,
            open: true,
            hmr: true,
            proxy: {
                // with options
                '/api': {
                    target: 'http://localhost:3000/api',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        },
        build: {
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            }
        },
        css: {
            scopeBehaviour: 'local',
            generateScopedName: '[name]__[local]___[hash:base64:5]',
            localsConvention: 'dashes'
        }
    }
})
