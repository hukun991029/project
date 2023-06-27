<!--
 * @Author: your name
 * @Date: 2022-04-07 09:15:53
 * @LastEditTime: 2023-05-25 16:40:06
 * @LastEditors: Ikun
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /Code/project/src/App.vue
-->
<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
</script>
<template>
    <div>
        <a-config-provider :locale="zhCN">
            <router-view></router-view>
        </a-config-provider>
    </div>
</template>

<style>
html,
body {
    min-width: 1280px !important;
}
</style>
