<script lang="ts" setup>
import { ref } from 'vue';
import _ from 'lodash';
import place from '@/utils/place';
const props = defineProps({
    form: { type: Object, default: () => {}, required: true }
});
const dialogVisible = ref<boolean>(false);
const _form = ref(_.cloneDeep(props.form));
const showDialog = () => {
    dialogVisible.value = true;
};
const closeDialog = () => {
    dialogVisible.value = false;
};
const confirm = () => {};
defineExpose({
    showDialog
});
</script>
<template>
    <a-modal v-model:visible="dialogVisible" title="编辑" @ok="confirm">
        <a-form>
            <a-form-item>
                <a-input v-model:value="_form.username" placeholder="请输入用户名称"></a-input>
            </a-form-item>
            <a-form-item>
                <a-input v-model:value="_form.phone" placeholder="请输入电话号码"></a-input>
            </a-form-item>
            <a-form-item>
                <a-input v-model:value="_form.password" placeholder="请输入用户密码"></a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                    v-model:value="_form.validPassword"
                    placeholder="请二次输入用户密码"
                ></a-input>
            </a-form-item>
            <a-form-item>
                <a-cascader
                    v-model:value="_form.place"
                    :options="place"
                    placeholder="请选择省市区"
                    change-on-select
                />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<style lang="scss" scoped></style>
