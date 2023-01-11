<script lang="ts" setup>
import MenuDropDown from '../HeaderContent/MenuDropDown.vue';
import LanguageDropDown from '../HeaderContent/LanguageDropDown.vue';

console.log();
</script>
<template>
    <a-layout-header class="header">
        <div class="header-left-wrap">
            <img class="logo" src="../../assets/Image/logo.svg" alt="" />
            <h1>Ant Design Pro</h1>
        </div>
        <a-space>
            <span class="icon-wrap"><i class="iconfont icon-suosou"></i></span>
            <span class="icon-wrap"><i class="iconfont icon-icon_yiwenkongxin"></i></span>
            <span class="icon-wrap"><i class="iconfont icon-tongzhi"></i></span>
            <MenuDropDown />
            <LanguageDropDown />
        </a-space>
    </a-layout-header>
</template>
<style lang="scss" scoped>
.header {
    width: 100vw;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    .header-left-wrap {
        display: flex;

        align-items: center;
        height: 100%;
        .logo {
            height: 28px;
            vertical-align: middle;
        }
        h1 {
            margin-left: 12px;
            height: 32px;
            line-height: 32px;
            color: #fff;
            font-size: 18px;
        }
    }
    .icon-wrap {
        display: inline-block;
        height: 100%;
        padding: 0 12px;
        cursor: pointer;
        &:hover {
            background: #252a3d;
        }
        .iconfont {
            color: #fff;
        }
    }
}
</style>
