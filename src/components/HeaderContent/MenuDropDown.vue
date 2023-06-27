<script lang="ts" setup>
import { useRouter } from 'vue-router'
import userStore from '@/store/store'
import UploadAvatarDialog from './UploadAvatarDialog.vue'
import { ref } from 'vue'
console.log(userStore())
const store = userStore()
const username = store?.userInfo?.username
let avatar = ref(store?.userInfo?.avatar)
const router = useRouter()
const dialogVisible = ref<boolean>(false)
const menuClick = ({ key }) => {
    if (key === 'setting') {
        dialogVisible.value = true
    }
    if (key === 'loginOut') {
        store.clearUserInfo()
        localStorage.clear()
        router.replace('/login')
    }
}
const getImageUrl = (url: string) => {
    avatar.value = url
}
</script>
<template>
    <div>
        <a-dropdown>
            <div class="user-info-wrap icon-wrap" @click.prevent>
                <img class="user-img" :src="avatar" alt="" />
                <span class="link-title">{{ username }}</span>
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
                            <span class="menu-info">头像设置</span>
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
        <UploadAvatarDialog
            :dialogVisible="dialogVisible"
            @update:dialogVisible="dialogVisible = $event"
            @getImageUrl="getImageUrl"
        ></UploadAvatarDialog>
    </div>
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
