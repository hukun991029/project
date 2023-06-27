<script lang="ts" setup>
import Form from './components/Form.vue'
const form = ref({
    name: '张三',
    age: '12'
})
const handleClick = () => {
    console.log(form.value)
}
watch(
    () => form.value,
    (newVal) => {
        console.log(newVal)
    },
    {
        deep: true
    }
)
</script>
<template>
    <div>
        <a-card>
            <Form v-model:form="form"></Form>
            <a-button @click="handleClick">点击</a-button>
        </a-card>
    </div>
</template>
<style lang="scss" scoped></style>
