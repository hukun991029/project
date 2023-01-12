<script lang="ts" setup>
import { PropType, ref } from 'vue'
import { FormInstance } from 'ant-design-vue'
import _ from 'lodash'
import { Options } from './type'
const props = defineProps({
    dialogVisible: {
        type: Boolean,
        default: false,
        required: true
    },
    rules: {
        type: Array,
        required: false,
        default: () => []
    },
    options: {
        type: Array as PropType<Options[]>,
        required: true,
        default: () => [
            {
                label: '',
                prop: '',
                type: '',
                attrs: {}
            }
        ]
    },
    formOptions: {
        type: Object,
        default: () => {},
        required: false
    }
})
const emits = defineEmits(['update:dialogVisible', 'confirm'])
const formatForm = (arr) => {
    const res = {}
    arr.forEach((item) => {
        res[item.prop] = item.value
    })
    return res
}
const formRef = ref<FormInstance>()

let _form = ref(_.cloneDeep(props.options))
_form.value = formatForm(_form.value)
const handleConfirm = () => {
    emits('confirm', _form.value)
    resetFields()
    emits('update:dialogVisible', false)
}
const handleCancel = () => {
    resetFields()
    emits('update:dialogVisible', false)
}
const resetFields = () => {
    formRef.value && formRef.value.resetFields()
}
</script>
<template>
    <a-modal
        v-model:visible="dialogVisible"
        @ok="handleConfirm"
        @cancel="handleCancel"
        v-bind="$attrs"
    >
        <a-form ref="formRef" :rules="rules" :form="_form" autocomplete="off" v-bind="formOptions">
            <a-form-item
                v-for="item in options"
                :key="item.prop"
                :label="item.label"
                :name="item.prop"
            >
                <component
                    :is="`a-${item.type}`"
                    v-model:value="_form[item.prop]"
                    v-bind="item.attrs"
                    :placeholder="item.placeholder"
                    allowClear
                ></component>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<style lang="scss" scoped></style>
