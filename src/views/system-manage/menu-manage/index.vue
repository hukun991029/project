<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import Form from './components/Form/index.vue'
import Table from './components/Table/index.vue'
import { ref, reactive, onMounted } from 'vue'
import * as $Icon from '@ant-design/icons-vue'
import type { FormInstance } from 'ant-design-vue'
import { FormState } from './type'
import { getMenuTree, addAndEditMenu } from '@/api/system-manage/menu-manage'
interface Record extends FormState {
    _id: string
    children: Record[]
}
const getIcons = (iconList: string[]) => {
    return iconList.filter((item) => item.endsWith('ed'))
}
const dialogVisible = ref<boolean>(false)
const setDialogVisible = (status: boolean) => {
    dialogVisible.value = status
}
const iconList = ref<string[]>([])
const formRef = ref<FormInstance>()
let formState = reactive<FormState>({
    parentId: [],
    menuType: 1,
    menuName: '',
    menuIcon: undefined,
    routePath: '',
    componentPath: '',
    menuStatus: 1,
    permissionMarker: '',
    action: 'add'
})
const treeList = ref([])
const setFormState = (form: Partial<FormState>) => {
    formState = Object.assign(formState, form)
}
const cancel = () => {
    setDialogVisible(false)
}
const validateForm = () => {}
const confirm = async () => {
    formRef.value?.validate().then(async () => {
        const res = await addAndEditMenu(formState)
        console.log(res)
    })

    // setDialogVisible(false)
}
const addMenu = () => {
    setDialogVisible(true)
    setFormState({ action: 'add' })
}
const handleAdd = (row: Record) => {
    setDialogVisible(true)
    setFormState({ action: 'add', parentId: [row._id] })
}
const handleEdit = (row: Record) => {
    setDialogVisible(true)
    setFormState({ action: 'edit' })
}
const handleDel = (row: Record) => {}
const getTreeList = async () => {
    const res: any = await getMenuTree()
    treeList.value = res
}
onMounted(async () => {
    iconList.value = getIcons(Object.keys($Icon))
    getTreeList()
})
</script>
<template>
    <div>
        <a-card>
            <a-button type="primary" @click="addMenu" style="margin-bottom: 20px">
                新增菜单
            </a-button>
            <Table @add="handleAdd" @edit="handleEdit" @del="handleDel"></Table>
        </a-card>
        <Dialog title="新增菜单" :dialogVisible="dialogVisible" @cancel="cancel" @confirm="confirm">
            <template #default>
                <Form
                    ref="formRef"
                    :formState="formState"
                    :iconList="iconList"
                    :menuOptions="treeList"
                    @validate="validateForm"
                ></Form>
            </template>
        </Dialog>
    </div>
</template>
<style lang="scss" scoped></style>
