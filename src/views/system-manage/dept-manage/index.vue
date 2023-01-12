<script lang="ts" setup>
import Search from './components/search/index.vue'
import dayjs from 'dayjs'
import Dialog from '@/components/dialog/index.vue'
import { Options } from '@/components/Dialog/type'
import { onMounted, ref, nextTick } from 'vue'
import { getAllUser, addDept } from '@/api/system-manage/dept-manage'
import { message } from 'ant-design-vue'
const columns = [
    {
        title: '部门名称',
        dataIndex: 'deptName',
        key: 'deptName',
        align: 'center'
    },
    {
        title: '负责人',
        dataIndex: 'principal',
        key: 'principal',
        align: 'center'
    },
    {
        title: '负责人ID',
        dataIndex: 'principalId',
        key: 'principalId',
        align: 'center'
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD HH:mm:ss')
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        align: 'center',
        customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD HH:mm:ss')
    }
]
const dialogVisible = ref<boolean>(false)
const selectList = ref([])
const options: Options[] = [
    {
        label: '上级部门',
        prop: 'parentId',
        value: null,
        type: 'cascader',
        placeholder: '请选择上级部门',
        attrs: {
            options: [],
            'change-on-select': true,
            'expand-trigge': 'hover'
        }
    },
    {
        label: '部门名称',
        prop: 'deptName',
        value: '',
        type: 'input',
        placeholder: '请输入部门名称',
        attrs: {
            autocomplete: 'off'
        }
    },
    {
        label: '负责人',
        prop: 'userId',
        value: undefined,
        type: 'select',
        placeholder: '请选择负责人',
        attrs: {
            autocomplete: 'off',
            options: []
        }
    }
]
const formOptions = { 'label-col': { span: 4 } }
const dialogRef = ref()
const getUserList = async () => {
    const res: any = await getAllUser()
    selectList.value = res.map((item) => {
        return { label: item.username, value: item.userId }
    })
    console.log(selectList.value)
}
const createDept = () => {
    dialogVisible.value = true
    nextTick(() => {
        options[2].attrs.options = selectList.value
        // dialogRef.value.resetFields()
    })
}
const confirm = async (val) => {
    await addDept(val)
    message.success('创建成功')
}
onMounted(() => {
    getUserList()
})
</script>
<template>
    <Search></Search>
    <a-card>
        <a-button type="primary" style="margin-bottom: 10px" @click="createDept">创建部门</a-button>
        <a-table :columns="columns"></a-table>
    </a-card>
    <Dialog
        ref="dialogRef"
        v-model:dialogVisible="dialogVisible"
        title="创建部门"
        :options="options"
        :formOptions="formOptions"
        @confirm="confirm"
    ></Dialog>
</template>
<style lang="scss" scoped></style>
