<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route);
</script>
<template>
    <a-layout-content
        :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            height: 'calc(100vh - 112px)'
        }"
    >
        <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item v-for="item in route.matched" :key="item.path">{{
                item.meta.title
            }}</a-breadcrumb-item>
        </a-breadcrumb>
        <router-view></router-view>
    </a-layout-content>
</template>
<style lang="scss" scoped></style>
