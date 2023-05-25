<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import type { TreeProps } from 'ant-design-vue'
const dialogVisible = ref(false)
const treeData: TreeProps['treeData'] = [
    {
        title: 'parent 1',
        key: '0-0',
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                disabled: true,
                children: [
                    { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
                    { title: 'leaf', key: '0-0-0-1' }
                ]
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [{ key: '0-0-1-0', title: 'sss' }]
            }
        ]
    }
]
const showDialog = () => {
    dialogVisible.value = true
}
const closeDialog = () => {
    dialogVisible.value = false
}
const handleConfirm = () => {
    closeDialog()
}
const handleCancel = () => {
    closeDialog()
}
defineExpose({
    showDialog
})
</script>
<template>
    <div>
        <Dialog
            title="权限设置"
            :dialogVisible="dialogVisible"
            @confirm="handleConfirm"
            @cancel="handleCancel"
        >
            <template #default>
                <a-tree checkable :tree-data="treeData">
                    <template #title="{ title, key }">
                        <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
                        <template v-else>{{ title }}</template>
                    </template>
                </a-tree>
            </template>
        </Dialog>
    </div>
</template>
<style lang="scss" scoped></style>
