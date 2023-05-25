<script lang="ts" setup>
const emits = defineEmits(['update:roleName'])
const props = defineProps({
    roleName: {
        type: String,
        required: true,
        defaule: ''
    }
})
const handleSearch = () => {
    emits('update:roleName', props.roleName)
}
const handleReset = () => {
    emits('update:roleName', '')
}
</script>
<template>
    <a-card>
        <a-form :wrapper-col="{ span: 16 }" layout="inline">
            <a-form-item label="角色查询">
                <a-input placeholder="请输入角色名称" v-model:value="roleName"></a-input>
            </a-form-item>
            <a-button type="primary" style="margin-right: 10px" @click="handleSearch">
                查询
            </a-button>
            <a-button @click="handleReset">重置</a-button>
        </a-form>
    </a-card>
</template>
<style lang="scss" scoped></style>
