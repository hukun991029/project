<script lang="ts" setup>
defineProps({
    dialogVisible: {
        type: Boolean,
        default: false,
        required: true
    }
})
const emits = defineEmits(['cancel', 'confirm'])
const handleConfirm = () => {
    emits('confirm')
}
const handleCancel = () => {
    emits('cancel')
}
</script>
<template>
    <a-modal v-model:visible="dialogVisible" @ok="handleConfirm" @cancel="handleCancel" v-bind="$attrs">
        <slot></slot>
    </a-modal>
</template>
<style lang="scss" scoped></style>
