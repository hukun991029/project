<script setup lang="ts">
import { watch, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Icon from '../../utils/icon';
import Collapse from '../Collapse/index.vue';
import defaultRoute from '@/router/defaultRoute';
const router = useRouter();
const route = useRoute();
console.log(router);
console.log(route.path);
console.log(defaultRoute);

const state = reactive({
    rootSubmenuKeys: [],
    openKeys: ['system-management'],
    selectedKeys: [route.path],
    preOpenKeys: []
});
watch(
    () => route.path,
    (newVal, oldVal) => {
        console.log(newVal, oldVal);
    }
);
const onOpenChange = (openKeys: string[]) => {
    console.log(openKeys);
    const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1);
    if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
        state.openKeys = openKeys;
    } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
    }
};

const handleClick = (e) => {
    console.log('e.key');
    router.push({ path: e.key });
};

// 控制菜单折叠和展开
const isCollapse = ref<boolean>(false);
watch(
    () => isCollapse,
    (newVal, oldVal) => {
        state.openKeys = !!newVal ? [] : state.preOpenKeys;
    }
);
</script>

<template>
    <a-layout-sider class="slide" v-model:collapsed="isCollapse" :trigger="null" collapsible>
        <a-menu
            v-model:selectedKeys="state.selectedKeys"
            mode="inline"
            :open-keys="state.openKeys"
            @openChange="onOpenChange"
            @click="handleClick"
        >
            <a-sub-menu v-for="item in defaultRoute" :key="item.path">
                <template #icon>
                    <Icon :name="item.meta.icon"></Icon>
                </template>
                <template #title>
                    <span> {{ item.meta.title }}</span>
                </template>
                <a-menu-item v-for="ele in item.children" :key="ele.path">
                    <Icon :name="ele.meta.icon"></Icon>
                    {{ ele.meta.title }}
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
        <Collapse v-model:isCollapse="isCollapse"></Collapse>
    </a-layout-sider>
</template>
<style lang="scss" scoped>
.slide {
    height: calc(100vh - 64px);
    background-color: #fff;
    overflow: auto;
    ::v-deep(.ant-layout-sider-trigger) {
        background-color: #fff;
    }
}

#components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}
</style>
