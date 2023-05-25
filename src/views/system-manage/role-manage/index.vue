<script lang="ts" setup>
import Search from './components/search/index.vue'
import Table from './components/table/index.vue'
import Dialog from '@/components/Dialog/index.vue'
import type { FormInstance, Rule } from 'ant-design-vue'
import { getRoleList, roleOperate } from '@/api/system-manage/role-manage'
import { message } from 'ant-design-vue'
import PermissionDialog from './components/permission-dialog/index.vue'
type ActionOption = 'create' | 'edit' | 'del'
const dialogVisible = ref(false)
const formRef = ref<FormInstance>()
const rules: Record<string, Rule[]> = {
    roleName: [{ required: true, trigger: 'change' }]
}
const tableData = ref([])
// 表单
const form = ref({
    roleName: '',
    remark: '',
    id: ''
})
// 查询参数
const queryParams = ref({
    roleName: '',
    pageNum: 1,
    pageSize: 10
})
const handleSetPermission = (record) => {
    dialogRef.value.showDialog()
}
const total = ref<number>(0)
const action = ref<ActionOption>('create')
const dialogRef = ref()
const setDialogVisible = (flag: boolean): void => {
    dialogVisible.value = flag
}
const setAction = (type: ActionOption): void => {
    action.value = type
}
// 确认创建角色
const confirm = async () => {
    try {
        await formRef.value!.validateFields()
        const params = {
            ...form.value,
            action: action.value
        }
        await roleOperate(params)
        message.success(`${action.value === 'create' ? '新建角色成功' : '编辑成功'}`)
        getTableData()
        cancel()
    } catch (error) {
        console.log('Validate Failed:', error)
    }
}
// 取消创建角色
const cancel = () => {
    formRef.value!.resetFields()
    setDialogVisible(false)
}
// 新增角色
const handleCreate = () => {
    setDialogVisible(true)
    setAction('create')
}

const getTableData = async () => {
    const params = {
        ...queryParams.value
    }
    const res: any = await getRoleList(params)
    tableData.value = res.row
}
const handleEdit = (record) => {
    setAction('edit')
    const { roleName, remark, _id } = record
    setDialogVisible(true)
    nextTick(() => {
        form.value = {
            roleName,
            remark,
            id: _id
        }
    })
}
const handleSearch = (roleName) => {
    queryParams.value.roleName = roleName
    getTableData()
}
onMounted(() => {
    getTableData()
})
</script>
<template>
    <Search v-model:roleName="queryParams.roleName" @update:roleName="handleSearch"></Search>
    <a-card style="margin-top: 10px">
        <a-button type="primary" class="add-btn" @click="handleCreate">新增角色</a-button>
        <Table
            :data-source="tableData"
            @refresh="getTableData"
            @edit="handleEdit"
            @setPermission="handleSetPermission"
        ></Table>
        <Dialog title="新增角色" :dialogVisible="dialogVisible" @confirm="confirm" @cancel="cancel">
            <template #default>
                <a-form
                    ref="formRef"
                    :model="form"
                    :label-col="{ span: 4 }"
                    :wrapper-col="{ span: 16 }"
                    autocomplete="off"
                    :rules="rules"
                >
                    <a-form-item label="角色名称" name="roleName">
                        <a-input
                            v-model:value="form.roleName"
                            placeholder="请输入角色名称"
                            allow-clear
                            show-count
                            :maxlength="10"
                        ></a-input>
                    </a-form-item>
                    <a-form-item label="备注" name="remark">
                        <a-textarea
                            v-model:value="form.remark"
                            placeholder="请输入备注信息"
                            allow-clear
                            show-count
                            :maxlength="100"
                        ></a-textarea>
                    </a-form-item>
                </a-form>
            </template>
        </Dialog>
        <PermissionDialog ref="dialogRef"></PermissionDialog>
    </a-card>
</template>
<style lang="scss" scoped>
.add-btn {
    margin-bottom: 20px;
}
</style>
