<script lang="ts" setup>
import Search from './components/search/index.vue'
import dayjs from 'dayjs'
import Dialog from '@/components/dialog/index.vue'
import type { Options } from '@/components/Form/type'
import Form from '@/components/Form/index.vue'
import {
    getAllUser,
    addDept,
    getTreeList,
    getDeptData,
    updateDept,
    delDept
} from '@/api/system-manage/dept-manage'
import { message } from 'ant-design-vue'
const dialogVisible = ref<boolean>(false)
const selectList = ref([])
const dialogRef = ref()
const treeData = ref([])
const tableData = ref([])
const loading = ref<boolean>(false)
const total = ref<number>(0)
const isEdit = ref<boolean>(false)
const id = ref()
const columns = [
    {
        title: '部门名称',
        dataIndex: 'deptName',
        key: 'deptName',
        align: 'center'
    },
    {
        title: '负责人',
        dataIndex: 'username',
        key: 'username',
        align: 'center'
    },
    {
        title: 'ID',
        dataIndex: 'userId',
        key: 'userId',
        align: 'center'
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        align: 'center'
    },
    {
        title: '电话号码',
        dataIndex: 'phone',
        key: 'phone',
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
    },
    {
        title: '操作',
        dataIndex: 'edit',
        key: 'edit',
        align: 'center'
    }
]
const queryParams = ref({
    deptName: '',
    pageNum: 1,
    pageSize: 10
})
const options = ref<Options[]>([
    {
        label: '上级部门',
        prop: 'parentId',
        value: [],
        type: 'cascader',
        placeholder: '请选择上级部门',
        attrs: {
            options: [],
            'change-on-select': true,
            'expand-trigge': 'hover',
            'field-names': { label: 'deptName', value: '_id', children: 'children' }
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
])
const formOptions = { 'label-col': { span: 4 } }
const pagination = computed(() => ({
    total,
    current: queryParams.value.pageNum,
    pageSize: queryParams.value.pageSize,
    howQuickJumper: true,
    showSizeChanger: true,
    showLessItems: true,
    showTotal: (total) => `共 ${total} 条`
}))

const getUserList = async () => {
    const res: any = await getAllUser()
    selectList.value = res.map((item) => {
        return { label: item.username, value: item.userId }
    })
}
const createDept = () => {
    isEdit.value = false
    options.value.forEach((item) => {
        item.value = item.prop === 'deptName' ? '' : []
    })
    options.value[0].attrs.options = treeData.value
    options.value[2].attrs.options = selectList.value
    dialogVisible.value = true
}
const confirm = async (val) => {
    try {
        if (isEdit.value) {
            const params = {
                ...val,
                _id: id.value
            }
            await updateDept(params)
            message.success('编辑')
        } else {
            await addDept(val)
            message.success('创建成功')
        }
        getTableData()
        getTreeData()
    } catch (error) {
        console.log(error)
    }
}
const getTreeData = async () => {
    const res: any = await getTreeList()
    treeData.value = res
}
const getTableData = async () => {
    try {
        loading.value = true
        const { rows, total: count } = await getDeptData(queryParams.value)
        tableData.value = rows
        total.value = count
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}
const refresh = (val) => {
    queryParams.value.deptName = val
    getTableData()
}
const handelEdit = (record: any) => {
    id.value = record._id
    isEdit.value = true
    options.value.forEach((item) => {
        item.value = record[item.prop]
    })
    options.value[0].attrs.options = treeData.value
    options.value[2].attrs.options = selectList.value
    dialogVisible.value = true
}
const handelDel = async (record: any) => {
    const params = {
        _id: record._id
    }
    await delDept(params)
    getTableData()
    getTreeData()
}
onMounted(() => {
    getTableData()
    getUserList()
    getTreeData()
})
</script>
<template>
    <Search v-model:deptName="queryParams.deptName" @refresh="refresh"></Search>
    <a-card>
        <a-button type="primary" style="margin-bottom: 10px" @click="createDept">创建部门</a-button>
        <a-table
            :columns="columns"
            :data-source="tableData"
            :rowKey="(record) => record._id"
            :pagination="pagination"
            :loading="loading"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'edit'">
                    <a @click="handelEdit(record)">编辑</a>
                    <a-divider type="vertical" />
                    <a @click="handelDel(record)">删除</a>
                </template>
            </template>
        </a-table>
    </a-card>
    <Dialog
        ref="dialogRef"
        v-model:dialogVisible="dialogVisible"
        title="创建部门"
        @confirm="confirm"
        destroyOnClose
    >
        <Form :options="options" :formOptions="formOptions"></Form>
    </Dialog>
</template>
<style lang="scss" scoped></style>
