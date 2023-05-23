<script lang="ts" setup>
import _ from 'lodash'
import { Options } from './type'
const props = defineProps({
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
const resetFields = () => {
    console.log(formRef.value)
    formRef.value && formRef.value.resetFields()
}
// watch(
//     () => props.dialogVisible,
//     (newVal) => {
//         console.log(newVal)
//         _form.value = formatForm(_.cloneDeep(props.options))
//     }
// )
const getFormValue = () => {
    return _form.value
}
defineExpose({
    resetFields,
    getFormValue
})
</script>
<template>
    <a-form ref="formRef" :rules="rules" :model="_form" autocomplete="off" v-bind="formOptions">
        <a-form-item v-for="item in options" :key="item.prop" :label="item.label" :name="item.prop">
            <component
                :is="`a-${item.type}`"
                v-model:value="_form[item.prop]"
                v-bind="item.attrs"
                :placeholder="item.placeholder"
                allowClear
            ></component>
        </a-form-item>
    </a-form>
</template>
<style lang="scss" scoped></style>
