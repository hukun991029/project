<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import { message } from 'ant-design-vue'
import { uploadAvatar } from '@/api/system-manage/user-manage'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'
import userStore from '@/store/store'
const props = defineProps({
    dialogVisible: {
        type: Boolean,
        default: false,
        required: false
    }
})
const store = userStore()
const userId = store.userInfo.userId

const emits = defineEmits(['update:dialogVisible', 'getImageUrl'])
const getBase64 = (img: Blob, callback: (base64Url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
}
const { dialogVisible } = toRefs(props)
const fileList = ref([])
const loading = ref<boolean>(false)
const imageUrl = ref<string>('')
const previewVisible = ref(false)
const previewImage = ref('')
const previewTitle = ref('')
const handleOk = async () => {
    try {
        const data = new FormData()
        data.append('file', fileList.value[0].originFileObj)
        const res = await uploadAvatar(userId, data)
        store.setUserInfo({ avatar: res.url })
        fileList.value = []
        emits('update:dialogVisible', false)
        emits('getImageUrl', res.url)
    } catch (error) {
        console.log(error)
    }
}

function getPreviewImgUrl(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
}
const handleChange = (info: UploadChangeParam) => {
    loading.value = true
    getBase64(info.file, (base64Url: string) => {
        imageUrl.value = base64Url
        loading.value = false
    })
}
const beforeUpload = (file: UploadProps['fileList'][number]) => {
    const isJpgOrPng = ['image/jpeg', 'image/png'].includes(file.type)
    if (!isJpgOrPng) {
        message.error('You can only upload JPG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('图片不能超过2MB!')
    }
    return false
}
const handlePreview = async (file: UploadProps['fileList'][number]) => {
    if (!file.url && !file.preview) {
        file.preview = (await getPreviewImgUrl(file.originFileObj)) as string
    }
    previewImage.value = file.url || file.preview
    previewVisible.value = true
    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
}
const handleCancel = () => {
    previewVisible.value = false
    fileList.value = []
}
const handleClose = () => {
    emits('update:dialogVisible', false)
}
</script>
<template>
    <div>
        <a-modal
            v-model:visible="dialogVisible"
            title="头像上传"
            @ok="handleOk"
            width="300px"
            @cancel="handleClose"
        >
            <a-row justify="center">
                <a-col>
                    <a-upload
                        v-model:file-list="fileList"
                        name="avatar"
                        list-type="picture-card"
                        class="avatar-uploader"
                        :show-upload-list="true"
                        :before-upload="beforeUpload"
                        @change="handleChange"
                        @preview="handlePreview"
                    >
                        <!-- <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="avatar" /> -->
                        <div v-if="!fileList.length">
                            <loading-outlined v-if="loading"></loading-outlined>
                            <plus-outlined v-else></plus-outlined>
                            <div class="ant-upload-text">上传头像</div>
                        </div>
                    </a-upload>
                </a-col>
            </a-row>
        </a-modal>
        <a-modal
            :visible="previewVisible"
            :title="previewTitle"
            :footer="null"
            @cancel="handleCancel"
        >
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>
<style lang="scss" scoped>
.avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
}
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}
.avatar {
    width: 128px;
    height: 128px;
}
.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>
