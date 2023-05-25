<script lang="ts" setup>
import { createVNode, onMounted, ref } from 'vue'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { getList } from '@/api/system-manage/menu-manage'
import dayjs from 'dayjs'
import Icon from '@/utils/icon'
const emits = defineEmits(['add', 'edit', 'del'])

const tableData = ref([])

const columns = [
    {
        title: '菜单名称',
        dataIndex: 'menuName',
        key: 'menuName',
        align: 'center',
        fixed: 'left'
    },
    {
        title: '菜单图标',
        dataIndex: 'menuIcon',
        key: 'menuIcon',
        align: 'center'
    },
    {
        title: '菜单类型',
        dataIndex: 'menuType',
        key: 'menuType',
        align: 'center',
        customRender: ({ text }: { text: string }) => {
            return text === '1' ? '菜单' : '按钮'
        }
    },
    {
        title: '权限标识',
        dataIndex: 'permissionMaker',
        key: 'permissionMaker',
        align: 'center',
        ellipsis: true,
        customRender: ({ text }: { text: string }) => {
            return text || '暂无数据'
        }
    },
    {
        title: '路由地址',
        dataIndex: 'routePath',
        key: 'routePath',
        align: 'center',
        ellipsis: true
    },
    {
        title: '组件路径',
        dataIndex: 'componentPath',
        key: 'componentPath',
        align: 'center'
    },
    {
        title: '菜单状态',
        dataIndex: 'menuStatus',
        key: 'menuStatus',
        align: 'center',
        customRender: ({ text }: { text: string }) => {
            return text === '1' ? '启用' : '禁用'
        }
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        customRender: ({ text }: { text: string }) => {
            return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
        },
        width: 200
    },

    {
        title: '操作',
        dataIndex: 'edit',
        key: 'edit',
        align: 'center',
        width: 200,
        fixed: 'right'
    }
]
const handleAdd = (row) => {
    emits('add', row)
}
const handleEdit = (row) => {
    emits('edit', row)
}
const handleDel = (row) => {
    Modal.confirm({
        title: '您确认删除该菜单吗?',
        icon: createVNode(ExclamationCircleOutlined),
        content: '',
        okText: '确认',
        cancelText: '取消',
        onOk() {
            emits('del', row)
        },
        onCancel() {}
    })
}
onMounted(async () => {
    const res = await getList()
    tableData.value = res.rows
})
</script>
<template>
    <div>
        <a-table
            :dataSource="tableData"
            :columns="columns"
            bordered
            :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
            :scroll="{ x: 1500, y: 300 }"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'menuIcon'">
                    <Icon :name="record.menuIcon"></Icon>
                </template>
                <template v-if="column.key === 'edit'">
                    <a @click="handleAdd(record)">新增</a>
                    <a-divider type="vertical"></a-divider>
                    <a @click="handleEdit(record)">编辑</a>
                    <a-divider type="vertical"></a-divider>
                    <a @click="handleDel(record)">删除</a>
                </template>
            </template>
        </a-table>
    </div>
</template>
<style lang="scss" scoped></style>
