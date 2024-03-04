<template>
  <el-upload
      ref="uploadRef"
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="handleHttpUpload"
      :accept="accept"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
      }"
  >


    <div :style="{
        width: `${width}px`,
        height: `${height}px`,
      }" v-if="modelValue" class="avatar">
      <el-image
          ref="imgRef"
          :style="{
        width: `${width}px`,
        height: `${height}px`,
        display:'block'
      }" :src="modelValue" alt=""/>
      <div class="el-upload-avatar-actions" @click.stop="">
        <!--          <span @click="previewHandler">-->
        <!--            <el-icon><zoom-in/></el-icon>-->
        <!--          </span>-->
        <span @click.stop="imgRef?.$el?.click?.()">
           <Upload  />
          </span>
        <span @click.stop=" emit('update:modelValue', '')">
            <Delete />
          </span>
      </div>
    </div>
    <el-icon v-else class="avatar-uploader-icon">
      <Plus/>
    </el-icon>

  </el-upload>
</template>

<script lang="ts" setup>
import {ElMessage} from 'element-plus'
import {Delete, Download, Plus, Position, Upload, ZoomIn} from '@element-plus/icons-vue'

const emit: SetupContext['emit'] = defineEmits()
import type {UploadProps} from 'element-plus'
import {SetupContext} from "vue";

const props = defineProps({
  api: {
    type: [Function, null],
    default: null,
  },
  modelValue: {
    type: [String],
    default: '',
  },
  width: {
    type: [Number],
    default: 178,
  },
  height: {
    type: [Number],
    default: 178,
  },
  accept: {
    type: [String],
    default: 'image/*',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const imgRef = ref()
const uploadRef = ref()
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  ElMessage.success('上传成功')
  console.log(response, 'response')
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
  return api(formData)
};

const previewHandler = (options) => {
  console.log(imgRef.value.$el)
}
</script>

<style scoped>
.avatar-uploader .avatar {
  position: relative;

  .el-upload-avatar-actions {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
   justify-content: space-evenly;
    align-items: center;
    opacity: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #fffbe8;
    padding: 0 15%;
    & > span {
      padding: min(calc(16% - 3.4px), 20px);

      svg{
        min-width: 20px;
        min-height: 20px;
      }
    }

    &:hover {
      opacity: 1;
    }
  }
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
  width: 100%;
  height: 100%;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  text-align: center;
}


</style>
