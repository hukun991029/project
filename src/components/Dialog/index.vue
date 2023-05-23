<script lang="ts" setup>
import { PropType, ref, watch } from 'vue'
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
const formRef = ref()
console.log(props.options)

let _form = ref()
_form.value = formatForm(_.cloneDeep(props.options))
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
    console.log(formRef.value)
    formRef.value && formRef.value.resetFields()
}
watch(
    () => props.dialogVisible,
    (newVal) => {
        console.log(newVal)
        _form.value = formatForm(_.cloneDeep(props.options))
    }
)
defineExpose({
    resetFields
})
</script>
<template>
    <a-modal
        v-model:visible="props.dialogVisible"
        @ok="handleConfirm"
        @cancel="handleCancel"
        v-bind="$attrs"
    >
        <a-form ref="formRef" :rules="rules" :model="_form" autocomplete="off" v-bind="formOptions">
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
