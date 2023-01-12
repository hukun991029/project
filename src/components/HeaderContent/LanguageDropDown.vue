<script lang="ts" setup>
import { reactive } from 'vue'
const menuList = reactive([
    {
        key: 'BD',
        language: 'বাংলা'
    },
    {
        key: 'US',
        language: 'English'
    },
    {
        key: 'CN',
        language: '简体中文'
    },
    {
        key: 'Hk',
        language: '繁体中文'
    }
])
const menuClick = ({ key }) => {
    console.log(key)
}
</script>
<template>
    <a-dropdown>
        <i class="iconfont icon-ziyuan"></i>
        <template #overlay>
            <a-menu @click="menuClick">
                <a-menu-item v-for="item in menuList" :key="item.key">
                    <span>
                        {{ item.key }}
                        <span class="menu-info">{{ item.language }}</span>
                    </span>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>
<style lang="scss" scoped>
.iconfont {
    display: inline-block;
    height: 100%;
    color: #fff;
    cursor: pointer;
    padding: 0 12px;
    &:hover {
        background: #252a3d;
    }
}
.ant-dropdown-menu-item {
    ::v-deep {
        font-size: 14px;
    }
}
</style>
