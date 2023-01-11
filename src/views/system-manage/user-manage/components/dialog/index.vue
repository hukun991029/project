<script lang="ts" setup>
import { nextTick, ref, PropType } from 'vue';
import _ from 'lodash';
import place from '@/utils/place';
import type { FormInstance } from 'ant-design-vue';
import type { FormOption } from '../../type';
import { addUser, updateUser } from '@/api/system-manage/user-manage';
import { message } from 'ant-design-vue';
import { Form } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
const props = defineProps({
    form: { type: Object as PropType<FormOption>, default: () => {}, required: true },
    isEdit: {
        type: Boolean,
        default: false,
        required: false
    }
});
const emits = defineEmits(['refresh']);
const useForm = Form.useForm;
const validEmail = async (_rule: Rule, value: string) => {
    if (!value) {
        return Promise.reject('请输入邮箱');
    } else {
        const isValid = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        if (!isValid) {
            return Promise.reject('邮箱格式不正确,请重新输入');
        } else {
            return Promise.resolve();
        }
    }
};
const validPhone = async (_rule: Rule, value: string) => {
    if (!value) {
        return Promise.reject('请输入电话号码');
    } else {
        const isValid =
            /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value);
        if (!isValid) {
            return Promise.reject('电话号码格式不正确,请重新输入');
        } else {
            return Promise.resolve();
        }
    }
};
const validPassword = async (_rule: Rule, value: string) => {
    if (!value) {
        return Promise.reject('请输入密码');
    } else {
        if (value.length < 8 || value.length > 16) {
            return Promise.reject(' 密码长度为8-16位');
        } else {
            const isValid = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value);
            if (!isValid) {
                return Promise.reject('密码格式不正确,密码需要包含数字和英文,请重新输入');
            } else {
                return Promise.resolve();
            }
        }
    }
};
const rules = {
    username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
    email: [{ required: true, validator: validEmail, trigger: 'blur' }],
    phone: [{ required: true, validator: validPhone, trigger: 'blur' }],
    password: [{ required: true, validator: validPassword, trigger: 'blur' }],
    address: [{ required: true, trigger: 'change', message: '请选择用户地址' }]
};
const formRef = ref<FormInstance>();
const dialogVisible = ref<boolean>(false);
const _form = ref<any>({});
const { resetFields, validate, validateInfos } = useForm(_form, rules);
const showDialog = () => {
    nextTick(() => {
        dialogVisible.value = true;
        _form.value = _.cloneDeep(props.form);
        resetFields();
    });
};

const closeDialog = () => {
    resetFields();
    dialogVisible.value = false;
};
const confirm = () => {
    validate().then(async () => {
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
    });
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
        <a-form
            ref="formRef"
            :label-col="{ span: 4 }"
            :model="_form"
            :rules="rules"
            autocomplete="off"
        >
            <a-form-item label="用户名称" v-bind="validateInfos.username">
                <a-input
                    v-model:value="_form.username"
                    placeholder="请输入用户名称"
                    :maxlength="16"
                    showCount
                    :disabled="props.isEdit"
                    autocomplete="off"
                    @blur="validate('username')"
                ></a-input>
            </a-form-item>
            <a-form-item label="邮箱" v-bind="validateInfos.email">
                <a-input
                    v-model:value="_form.email"
                    placeholder="请输入用户邮箱"
                    @blur="validate('email')"
                ></a-input>
            </a-form-item>
            <a-form-item label="电话号码" v-bind="validateInfos.phone">
                <a-input
                    v-model:value="_form.phone"
                    placeholder="请输入电话号码"
                    autocomplete="off"
                    @blur="validate('phone')"
                ></a-input>
            </a-form-item>
            <a-form-item label="用户密码" v-if="!props.isEdit" v-bind="validateInfos.password">
                <a-input-password
                    v-model:value="_form.password"
                    placeholder="请输入用户密码"
                    password
                    autocomplete="off"
                    @blur="validate('password')"
                ></a-input-password>
            </a-form-item>
            <a-form-item label="用户地址" v-bind="validateInfos.address">
                <a-cascader
                    v-model:value="_form.address"
                    :options="place"
                    expand-trigger="hover"
                    placeholder="请选择用户地址"
                    change-on-select
                    @change="validate('address')"
                />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<style lang="scss" scoped></style>
