<script lang="ts" setup>
import bcrypt from 'bcryptjs';
import { login } from '@/api/login';
import useStore from '@/store/store';
import { reactive, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
interface FormState {
    username: string;
    password: string;
    checked: boolean;
}
const formState = reactive<FormState>({
    username: '',
    password: '',
    checked: false
});
const store = useStore();
const router = useRouter();
const onFinish = async (values: any) => {
    // console.log(values);
    // let params = toRaw(values);
    // const salt = bcrypt.genSaltSync(10);
    // params.password = bcrypt.hashSync(params.password, salt);
    try {
        const res = await login(values);
        // store.setUserInfo(res);
        router.push({ path: '/home/personal' });
    } catch (error) {
        console.log(error);
    }
};
</script>
<template>
    <div class="login-wrap">
        <div class="login-container" style="width: 364px">
            <h1 style="text-align: center">系 统</h1>
            <a-form
                :model="formState"
                name="basic"
                :wrapper-col="{ span: 24 }"
                autocomplete="off"
                @finish="onFinish"
            >
                <a-form-item
                    name="username"
                    :rules="[
                        { required: true, message: '请输入您的用户名', trigger: 'blur' },
                        { min: 3, max: 8, message: '用户名长度3-8位' }
                    ]"
                >
                    <a-input v-model:value="formState.username" placeholder="请输入用户名">
                        <template #prefix>
                            <user-outlined type="user" style="color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item
                    name="password"
                    :rules="[
                        { required: true, message: '请输入您的密码', trigger: 'blur' },
                        { min: 5, max: 12, message: '密码长度5-12位' }
                    ]"
                >
                    <a-input-password v-model:value="formState.password" placeholder="请输入密码">
                        <template #prefix>
                            <lock-outlined type="user" style="color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-row justify="space-between">
                        <a-checkbox v-model:checked="formState.checked">记住我</a-checkbox>
                        <a href="">忘记密码</a>
                    </a-row>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 24 }">
                    <a-button type="primary" html-type="submit" style="width: 100%">登录</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.login-wrap {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
