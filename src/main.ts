/*
 * @Author: your name
 * @Date: 2022-04-07 09:15:53
 * @LastEditTime: 2023-01-09 17:42:43
 * @LastEditors: Ikun
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \CODE\project\src\main.ts
 */
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index'
import './assets/css/global.css'
import './assets/iconfont/iconfont.css'
import 'nprogress/nprogress.css'
createApp(App).use(router).use(Antd).use(createPinia()).mount('#app')
