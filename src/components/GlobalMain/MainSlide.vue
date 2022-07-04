<script setup lang="ts">
import { watch, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Icon from '../../utils/icon';
let router = useRouter();
const route = useRoute();
console.log(router);
console.log(route.path);

const state = reactive({
    rootSubmenuKeys: ['1', '2', '3', '4', '5'],
    openKeys: ['personal-info'],
    selectedKeys: [route.path]
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
    console.log('e.key', e.key);
    router.push(e.key);
};
</script>

<template>
    <a-layout-sider class="slide" width="200" style="background: #fff">
        <a-menu
            v-model:selectedKeys="state.selectedKeys"
            style="width: 200px"
            mode="inline"
            :open-keys="state.openKeys"
            @openChange="onOpenChange"
            @click="handleClick"
        >
            <a-sub-menu v-for="(item, index) in router.options.routes[0].children" :key="index + 1">
                <template #icon>
                    <Icon :name="item.meta.icon"></Icon>
                </template>
                <template #title>
                    <span> {{ item.meta.title }}</span>
                </template>
                <a-menu-item v-for="ele in item.children" :key="ele.path">
                    {{ ele.meta.title }}
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
</template>
<style lang="scss" scoped>
.slide {
    height: calc(100vh - 64px);
}
</style>
