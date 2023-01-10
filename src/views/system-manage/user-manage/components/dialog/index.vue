<script lang="ts" setup>
import { nextTick, ref, PropType } from 'vue';
import _ from 'lodash';
import place from '@/utils/place';
import type { FormInstance } from 'ant-design-vue';
import type { FormOption } from '../../type';
import { addUser, updateUser } from '@/api/system-manage/user-manage';
import { message } from 'ant-design-vue';
const props = defineProps({
    form: { type: Object as PropType<FormOption>, default: () => {}, required: true },
    isEdit: {
        type: Boolean,
        default: false,
        required: false
    }
});
const emits = defineEmits(['refresh']);
const formRef = ref<FormInstance>();
const dialogVisible = ref<boolean>(false);
const _form = ref<FormOption>({});
const showDialog = () => {
    nextTick(() => {
        _form.value = _.cloneDeep(props.form);
        dialogVisible.value = true;
    });
};
const closeDialog = () => {
    formRef.value.resetFields();
    dialogVisible.value = false;
};
const confirm = async () => {
    const [province, city, area] = _form.value.address;
    const { username, password, email, phone } = _form.value;
    const params = {
        username,
        email,
        phone,
        address: { province, city, area }
    };
    if (props.isEdit) {
        try {
            await updateUser(params);
            message.success('编辑成功');
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            Object.assign(params, {
                password
            });
            await addUser(params);
            message.success('创建成功');
        } catch (error) {
            console.log(error);
        }
    }
    emits('refresh');
    closeDialog();
};
const cancel = () => {
    closeDialog();
};

defineExpose({
    showDialog
});
</script>
<template>
    <a-modal
        v-model:visible="dialogVisible"
        :title="$props.isEdit ? '编辑' : '创建'"
        @ok="confirm"
        @cancel="cancel"
    >
        <a-form ref="formRef" :label-col="{ span: 4 }" :model="_form">
            <a-form-item label="用户名" name="username">
                <a-input
                    v-model:value="_form.username"
                    placeholder="请输入用户名称"
                    :disabled="props.isEdit"
                ></a-input>
            </a-form-item>
            <a-form-item label="邮箱" name="email">
                <a-input v-model:value="_form.email" placeholder="请输入用户邮箱"></a-input>
            </a-form-item>
            <a-form-item label="电话号码" name="phone">
                <a-input v-model:value="_form.phone" placeholder="请输入电话号码"></a-input>
            </a-form-item>
            <a-form-item label="用户密码" name="password" v-if="!props.isEdit">
                <a-input
                    v-model:value="_form.password"
                    placeholder="请输入用户密码"
                    password
                ></a-input>
            </a-form-item>
            <a-form-item label="地址" name="address">
                <a-cascader
                    v-model:value="_form.address"
                    :options="place"
                    placeholder="请选择省市区"
                    change-on-select
                />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<style lang="scss" scoped></style>
