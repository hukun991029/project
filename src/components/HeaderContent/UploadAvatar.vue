<script lang="ts" setup>
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import { uploadImage } from '@/api/system-manage/upload'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'
const dialogVisible = ref(false)
const fileList = ref([])
const loading = ref<boolean>(false)
const imageUrl = ref('')
const handleConfirm = async () => {
    loading.value = true
    const formData = new FormData()
    fileList.value.forEach((file: UploadProps['fileList'][number]) => {
        formData.append('avatar', file as any)
    })
    await uploadImage(formData)
    fileList.value = []
    loading.value = false
    dialogVisible.value = false
    imageUrl.value = ''
}
const showDialog = () => {
    dialogVisible.value = true
}
const getBase64 = (img: Blob, callback: (base64Url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
}

const beforeUpload = (file: UploadProps['fileList'][number]) => {
    const isJpgOrPng = ['image/jpeg', 'image/png'].includes(file.type)
    if (!isJpgOrPng) {
        message.error('您上传的不是图片文件!')
        return
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('图片大小不能超过2MB!')
        return
    }
    console.log(file)

    fileList.value = [file]
    getBase64(file, (base64Url: string) => {
        imageUrl.value = base64Url
    })
    return false
}

defineExpose({
    showDialog
})
</script>
<template>
    <a-modal v-model:visible="dialogVisible" title="头像上传" @ok="handleConfirm">
        <a-upload
            :file-list="fileList"
            list-type="picture-card"
            :beforeUpload="beforeUpload"
            :showUploadList="false"
        >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-if="!imageUrl">
                <loading-outlined v-if="loading"></loading-outlined>
                <plus-outlined v-else></plus-outlined>
                <div class="ant-upload-text">Upload</div>
            </div>
        </a-upload>
    </a-modal>
</template>
<style lang="scss" scoped>
.avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
}
img {
    width: 128px;
    height: 128px;
}
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>
