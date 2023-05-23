/*
 * @Author: your name
 * @Date: 2022-04-07 09:15:53
 * @LastEditTime: 2023-05-22 14:28:17
 * @LastEditors: Ikun
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \CODE\project\src\main.ts
 */
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router/index'
import directives from './directives/index'
import './assets/css/global.css'
import './assets/iconfont/iconfont.css'
import 'nprogress/nprogress.css'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
createApp(App).use(router).use(Antd).use(pinia).use(directives).mount('#app')
