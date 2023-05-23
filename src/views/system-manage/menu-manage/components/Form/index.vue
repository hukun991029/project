<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form'
import Icon from '@/utils/icon'
import { FormState } from '../../type'
import { PropType, reactive, ref } from 'vue'
defineProps({
    formState: {
        type: Object as PropType<FormState>,
        default: () => {},
        required: true
    },
    iconList: {
        type: Array,
        default: () => [],
        required: true
    }
})
const formRef = ref()
const menuOptions = reactive([])
const rules: Record<string, Rule[]> = {
    menuName: [{ required: true, trigger: 'blur' }]
}
const validate = async () => {
    return formRef.value.validateFields()
}
defineExpose({
    validate
})
</script>
<template>
    <div>
        <a-form
            ref="formRef"
            :model="formState"
            :rules="rules"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
        >
            <a-form-item label="父级菜单" name="parentMenu">
                <a-cascader
                    v-model:value="formState.parentId"
                    :options="menuOptions"
                    placeholder="请选择父级菜单,不选则默认一级菜单"
                    change-on-select
                />
            </a-form-item>
            <a-form-item label="菜单类型" name="menuType">
                <a-radio-group v-model:value="formState.menuType">
                    <a-radio :value="1">菜单</a-radio>
                    <a-radio :value="2">按钮</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item has-feedback label="菜单名称" name="menuName">
                <a-input
                    v-model:value="formState.menuName"
                    placeholder="请输入菜单名称"
                    show-count
                    :maxlength="10"
                    allow-clear
                ></a-input>
            </a-form-item>
            <a-form-item v-show="formState.menuType === 1" label="菜单图标" name="menuIcon">
                <a-select
                    v-model:value="formState.menuIcon"
                    placeholder="请选择菜单图标"
                    allow-clear
                >
                    <a-select-option v-for="item in iconList" :key="item">
                        <Icon :name="item"></Icon>
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item v-show="formState.menuType === 1" label="路由地址" name="routePath">
                <a-input
                    v-model:value="formState.routePath"
                    placeholder="请输入路由地址"
                    allow-clear
                ></a-input>
            </a-form-item>
            <a-form-item v-show="formState.menuType === 1" label="组件路径" name="componentPath">
                <a-input
                    v-model:value="formState.componentPath"
                    placeholder="请输入组件路径"
                    allow-clear
                ></a-input>
            </a-form-item>
            <a-form-item v-show="formState.menuType === 2" label="权限标识" name="permissionMarker">
                <a-input
                    v-model:value="formState.permissionMarker"
                    placeholder="请输入权限标识"
                    allow-clear
                ></a-input>
            </a-form-item>
            <a-form-item label="菜单状态" name="menuStatus">
                <a-radio-group v-model:value="formState.menuStatus">
                    <a-radio :value="1">启用</a-radio>
                    <a-radio :value="0">禁用</a-radio>
                </a-radio-group>
            </a-form-item>
        </a-form>
    </div>
</template>
<style lang="scss" scoped></style>
