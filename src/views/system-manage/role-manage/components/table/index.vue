<script lang="ts" setup>
import dayjs from 'dayjs'
import { roleOperate } from '@/api/system-manage/role-manage'
import { message } from 'ant-design-vue'
const emits = defineEmits(['refresh', 'edit', 'setPermission'])
const columns = [
    {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
        align: 'center'
    },
    {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        align: 'center'
    },
    {
        title: '权限列表',
        dataIndex: 'permission',
        key: 'permission',
        align: 'center'
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        customRender: ({ text }: { text: string }) => {
            return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        align: 'center',
        customRender: ({ text }: { text: string }) => {
            return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    {
        title: '操作',
        dataIndex: 'edit',
        key: 'edit',
        align: 'center'
    }
]
const handleEdit = (record) => {
    emits('edit', record)
}
const handleSetPermission = (record) => {
    emits('setPermission', record)
}

const handleDel = async (record) => {
    try {
        const params = {
            action: 'del',
            id: record._id
        }
        await roleOperate(params)
        emits('refresh')
        message.success('删除成功')
    } catch (error) {
        console.log(error)
    }
}
const cancel = () => {}
</script>
<template>
    <div>
        <a-table v-bind="$attrs" :columns="columns">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'edit'">
                    <a-button type="link" @click="handleEdit(record)">编辑</a-button>
                    <a-divider type="vertical" />
                    <a-button type="link" @click="handleSetPermission(record)">权限编辑</a-button>
                    <a-divider type="vertical" />
                    <a-popconfirm
                        title="您确认删除该条数据吗?"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="handleDel(record)"
                        @cancel="cancel"
                    >
                        <a-button type="link">删除</a-button>
                    </a-popconfirm>
                </template>
            </template>
        </a-table>
    </div>
</template>
<style lang="scss" scoped></style>
