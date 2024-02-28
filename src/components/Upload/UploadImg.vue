<template>
  <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="handleHttpUpload"
  >
    <img v-if="modelValue" :src="modelValue" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
const emit: SetupContext['emit'] = defineEmits()
import type { UploadProps } from 'element-plus'
import {SetupContext} from "vue";

const props = defineProps({
  api: {
    type: [Function,null],
    default: null,
  },
  modelValue: {
    type: [String],
    default: '',
  },
})


const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  ElMessage.success('上传成功')
  console.log(response,'response')
  emit('update:modelValue', response.data)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
 if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

/**
 * @description 图片上传
 * @param options upload 所有配置项
 * */
const handleHttpUpload = async (options) => {
  let formData = new FormData();
  formData.append("file", options.file);
  const api = props.api ?? upload;
  // try {
  //
  //   const data  = await api(formData);
  //   console.log(data,options,'datadatadata')
  //   options.onSuccess(data);
  // } catch (error) {
  //   options.onError(error);
  // }
  return api(formData)
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
