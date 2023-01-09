<script lang="ts" setup>
import { ref, watch } from 'vue';
import _ from 'lodash';
const timeValue = ref([]);
const props = defineProps({
    queryParams: {
        type: Object,
        default: () => {},
        required: true
    }
});

console.log(props.queryParams);
const emits = defineEmits(['refresh']);
const form = ref(_.cloneDeep(props.queryParams));

const timeChange = (val) => {
    if (val) {
        form.value.startTime = val[0];
        form.value.endTime = val[1];
    } else {
        form.value.startTime = form.value.endTime = '';
    }
};
const handleSubmit = () => {
    emits('refresh', form.value);
};
const reset = () => [];
// const onFinish = () => {
//     console.log(form.value);
// };
// const onFinishFailed = (errorInfo: any) => {
//     console.log('Failed:', errorInfo);
// };
</script>
<template>
    <a-card style="margin-bottom: 20px">
        <a-form layout="inline" :model="form">
            <a-form-item label="用户名" name="username">
                <a-input v-model:value="form.username" placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item label="用户Id" name="userId">
                <a-input v-model:value="form.userId" placeholder="请输入用户Id" />
            </a-form-item>
            <a-form-item label="时间筛选" name="timeValue">
                <a-range-picker
                    v-model:value="timeValue"
                    format="YYYY-MM-DD"
                    valueFormat="YYYY-MM-DD"
                    @change="timeChange"
                />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" @click="handleSubmit">查询</a-button>
                <a-button style="margin-left: 10px" @click="reset">重置</a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>
<style lang="scss" scoped></style>
