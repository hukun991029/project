<script lang="ts" setup>
interface FormState {
    name: string
    age: string
}
const props = defineProps({
    form: {
        type: Object as PropType<FormState>,
        required: true,
        default: () => {}
    }
})
const emits = defineEmits(['update:form'])

const formState = computed({
    get() {
        return props.form
    },
    set(val) {
        emits('update:form', val)
    }
})
const onFinish = (values: any) => {
    console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
}

</script>
<template>
    <div>
        <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
            <a-form-item
                label="Username"
                name="name"
                :rules="[{ required: true, message: 'Please input your username!' }]"
            >
                <a-input v-model:value="formState.name" />
            </a-form-item>

            <a-form-item
                label="Password"
                name="age"
                :rules="[{ required: true, message: 'Please input your password!' }]"
            >
                <a-input-password v-model:value="formState.age" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<style lang="scss" scoped></style>
