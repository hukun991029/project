<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
    deptName: {
        type: String,
        default: '',
        required: true
    }
})
const _deptName = ref(props.deptName)
const emits = defineEmits(['refresh'])
const search = () => {
    emits('refresh', _deptName.value)
}
const reset = () => {
    _deptName.value = ''
    emits('refresh', _deptName.value)
}
</script>
<template>
    <a-card style="margin-bottom: 10px">
        <a-row type="flex" align="middle">
            <a-col><span>部门名称：</span></a-col>
            <a-col :span="6">
                <a-input v-model:value="_deptName" placeholder="请输入部门名称"></a-input>
            </a-col>
            <a-button type="primary" style="margin: 0 10px" @click="search">查询</a-button>
            <a-button @click="reset">重置</a-button>
        </a-row>
    </a-card>
</template>
<style lang="scss" scoped></style>
