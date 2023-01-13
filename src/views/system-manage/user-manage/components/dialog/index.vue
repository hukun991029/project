<script lang="ts" setup>
import { nextTick, ref, PropType, onMounted } from 'vue'
import _ from 'lodash'
import place from '@/utils/place'
import { message, Form } from 'ant-design-vue'
import type { FormOption } from '../../type'
import { addUser, updateUser, getDeptList } from '@/api/system-manage/user-manage'
import { validPassword, validEmail, validPhone } from '@/utils/validRules'
const props = defineProps({
    form: { type: Object as PropType<FormOption>, default: () => {}, required: true },
    isEdit: {
        type: Boolean,
        default: false,
        required: false
    }
})
const emits = defineEmits(['refresh'])
const useForm = Form.useForm
const rules = {
    username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
    email: [{ required: true, validator: validEmail, trigger: 'blur' }],
    phone: [{ required: true, validator: validPhone, trigger: 'blur' }],
    password: [{ required: true, validator: validPassword, trigger: 'blur' }],
    address: [{ required: true, trigger: 'change', message: '请选择用户地址' }],
    deptList: [{ required: true, trigger: 'change', message: '请选择部门' }]
}
const formRef = ref()
const dialogVisible = ref<boolean>(false)
const _form = ref<any>({})
const deptList = ref([])
const { resetFields, validate, validateInfos } = useForm(_form, rules)
const showDialog = () => {
    nextTick(() => {
        dialogVisible.value = true
        _form.value = _.cloneDeep(props.form)
        resetFields()
    })
}

const closeDialog = () => {
    resetFields()
    dialogVisible.value = false
}
const confirm = () => {
    validate().then(async () => {
        const [province, city, area] = _form.value.address
        const { username, password, email, phone, deptList } = _form.value
        const params = {
            username,
            email,
            phone,
            address: { province, city, area },
            deptList
        }
        try {
            if (props.isEdit) {
                await updateUser(params)
                message.success('编辑成功')
            } else {
                Object.assign(params, {
                    password
                })
                await addUser(params)
                message.success('创建成功')
            }
        } catch (error) {
            console.log(error)
        }
        emits('refresh')
        closeDialog()
    })
}

const getDeptData = async () => {
    const res: any = await getDeptList()
    deptList.value = res
}
const cancel = () => {
    closeDialog()
}
onMounted(() => {
    getDeptData()
})
defineExpose({
    showDialog
})
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
            <a-form-item label="部门" v-bind="validateInfos.deptList">
                <a-cascader
                    v-model:value="_form.deptList"
                    :options="deptList"
                    :field-names="{ label: 'deptName', value: '_id', children: 'children' }"
                    expand-trigger="hover"
                    placeholder="请选择部门"
                    change-on-select
                    @change="validate('address')"
                />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<style lang="scss" scoped></style>
