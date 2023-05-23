/*
 * @Author: IKun
 * @Date: 2022-04-07 09:15:53
 * @LastEditTime: 2023-05-18 14:17:55
 * @LastEditors: Ikun
 * @Description: vite配置
 * @FilePath: \CODE\project\vite.config.ts
 */
import { defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
// import Checker from 'vite-plugin-checker'
import eslint from 'vite-plugin-eslint'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // const env = loadEnv(mode, process.cwd(), '')
    // console.log(env.APP_ENV)

    return {
        plugins: [
            vue(),
            eslint(),
            AutoImport({
                imports: [
                    // 插件预设支持导入的api
                    'vue',
                    'vue-router',
                    'pinia'
                    // 自定义导入的api
                ],
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/,
                    /\.vue\?vue/ // .vue
                ],
                dts: './auto-imports.d.ts',
                eslintrc: {
                    enabled: false,
                    filepath: './.eslintrc-auto-import.json',
                    globalsPropValue: true
                }
            })
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            },
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
        },
        base: './',
        esbuild: {
            drop: ['console', 'debugger']
        },
        css: {
            modules: {
                scopeBehaviour: 'local',
                generateScopedName: '[name]__[local]___[hash:base64:5]'
            },
            postcss: {}
        },
        build: {
            minify: 'esbuild',
            sourceMap: true,
            rollupOptions: {
                output: {
                    manualChunks: (id) => {
                        if (id.includes('node_modules')) {
                            return 'vendor'
                        }
                    }
                }
            }
        },
        server: {
            host: '127.0.0.1',
            port: 9001,
            open: true,
            hmr: true,
            proxy: {
                // with options
                '/api': {
                    target: 'http://localhost:3000/',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        }
    }
})
