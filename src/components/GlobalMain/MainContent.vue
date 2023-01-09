<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route);
</script>
<template>
    <a-layout-content
        :style="{
            padding: '0px 24px 24px',
            background: '#f2f3fc'
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
