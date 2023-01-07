<script lang="ts" setup>
const menuClick = ({ key }) => {
    console.log(key);
};
</script>
<template>
    <a-dropdown>
        <div class="user-info-wrap icon-wrap" @click.prevent>
            <img class="user-img" src="../../assets/Image/user.png" alt="" />
            <span class="link-title">Serati Ma</span>
        </div>
        <template #overlay>
            <a-menu @click="menuClick">
                <a-menu-item key="userInfo">
                    <span>
                        <i class="iconfont icon-jurassic_user"></i>
                        <span class="menu-info">个人中心</span>
                    </span>
                </a-menu-item>
                <a-menu-item key="setting">
                    <span>
                        <i class="iconfont icon-shezhi"></i>
                        <span class="menu-info">个人设置</span>
                    </span>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="loginOut">
                    <span>
                        <i class="iconfont icon-tuichu"></i>
                        <span class="menu-info">退出登录</span>
                    </span>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>
<style lang="scss" scoped>
.link-title {
    color: #fff;
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
.user-info-wrap {
    display: flex;
    align-items: center;
    cursor: pointer;
    .user-img {
        height: 24px;
        margin-right: 8px;
    }
}
.menu-info {
    margin-left: 8px;
}
</style>
