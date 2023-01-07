<!--
 * @Author: your name
 * @Date: 2022-04-12 17:33:50
 * @LastEditTime: 2022-04-12 17:33:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bug-2.7d:\vite-project\Pinia.md
-->

# Vue 全局状态管理：Pinia

## 一、为什么要使用 Pinia？

### Pinia 是 Vue 的存储库，它允许您跨组件/页面共享状态。

1. 开发工具支持
    1. 跟踪动作、突变的时间表
    2. 商店出现在使用它们的组件中
    3. 时间旅行和更容易的调试
2. 热模块更换
    1. 在不重新加载页面的情况下修改您的商店
    2. 在开发时保持任何现有状态
3. 使用插件扩展 Pinia 功能
4. 为 JS 用户提供适当的 TypeScript 支持或自动完成功能
5. 服务器端渲染支持

## 二、安装

```javascript
yarn add pinia
# or with npm
npm install pinia
```

### 挂载

```javascript
import { createPinia } from 'pinia';
app.use(createPinia());
```

如果您使用的是 Vue 2，您还需要安装一个插件并`pinia`在应用程序的根目录注入创建的插件

```javascript
import { createPinia, PiniaVuePlugin } from 'pinia'
Vue.use(PiniaVuePlugin)
const pinia = createPinia()
new Vue({
  el: '#app',
 multiple Vue apps on
  pinia,
})
```

## 三、使用

在使用之前我们应该知道并非所有应用程序都需要访问全局状态。存储应该包含可以在整个应用程序中访问的数据。这包括在许多地方使用的数据，例如在导航栏中显示的用户信息，以及需要通过页面保存的数据。

1. ### Store

    Store 是一个保存状态和业务逻辑的实体，可以自由读取和写入，并通过导入后在 setup 中使用

    1. #### 创建一个 store

        ```javascript
        import { defineStore } from 'pinia
        const useCounterStore = defineStore('counterStore', {
          state: () => ({
            counter:
          })
        })
        ```

    2. #### 在其他页面使用 Store

        ```javascript
        <script setup lang="ts">
            //*** 代表此处你本地文件的路径 import {useCounterStore} from '***'; const
            store=useCounterStore() // 此处可以通过解构赋值 const {counter}=store
        </script>
        ```

    3. #### 重置 Store

        您可以通过调用 store 上的方法将状态*重置*为其初始值：`$reset()`

        ```javascript
        <script setup lang="ts">
            //*** 代表此处你本地文件的路径 import {useCounterStore} from '***'; const
            store=useCounterStore() store.$reset()
        </script>
        ```

    4. 更新 Store

        1. 直接更改 store 的属性

            ```javascript
            <script setup lang="ts">
            //*** 代表此处你本地文件的路径
            import { useCounterStore } from '***';
            const store=useCounterStore()
            </script>
            <template>
            <button @click='()=>{store.counter++}'>点击改变counter</button>
            </template>
            ```

        2. 通过$patch 方法

            1. 接收对象的方式允许对部分对象同时应用多个更改：但是，使用这种语法应用某些突变确实很难或成本很高：任何集合修改（例如，从数组中推送、删除、拼接元素）都需要创建一个新集合。

            ```
            <script setup lang="ts">
            //*** 代表此处你本地文件的路径
            import { useCounterStore } from '***';
            const store=useCounterStore()
            store.$patch({
              counter: store.counter + 1,
            })
            </script>
            ```

            2. 接收函数的方式

                ```javascript
                <script setup lang="ts">
                //*** 代表此处你本地文件的路径
                import { useCounterStore } from '***';
                const store=useCounterStore()
                store.$patch((state)=>{
                state.items.push({ name: 'shoes', quantity: 1 })
                state.hasChanged = true
                })
                </script>
                ```

        3. #### 更换 State

            ```javascript
            <script setup lang="ts">
            //*** 代表此处你本地文件的路径
            import { useCounterStore } from '***';
            const store=useCounterStore()
            store.$state = { counter: 666, name: 'Paimon' }
            })
            </script>
            ```

2. 使用 Getters
3. 使用 Actions

###

##
