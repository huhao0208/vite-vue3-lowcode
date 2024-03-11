<script setup>
import useModel from 've/hooks/useModel.js'

const props = defineProps({
  modelValue: Object
})
const emit = defineEmits(['update:modelValue'])

const data = useModel(() => props.modelValue, e => emit('update:modelValue', e))

const clickTypeObj = {
  request: {
    title: '发送请求',
    disabled: true
  },

  alert: {
    "title": "弹窗",
    "disabled": false
  },
  router: {
    "title": "路由",
    "disabled": true
  },
  link: {
    "title": "跳转",
    "disabled": false
  }
}

</script>

<template>
  <el-form label-width="100px" :model="data">
    <el-form-item label="事件类型">
      <!--      选择  发送请求 弹窗-->
      <el-select v-model="data.clickType" placeholder="请选择"  disabled>
        <el-option v-for="(item,key) in clickTypeObj" :key="key" :disabled="item.disabled" :label="item.title"
                   :value="key"></el-option>
      </el-select>
    </el-form-item>
    <!--跳转链接-->
    <el-form-item v-if="data.clickType==='link'" label="跳转地址">
      <el-input :placeholder="`请输入跳转链接`" v-model="data.link"></el-input>
    </el-form-item>
    <!--跳转路由名称-->
    <el-form-item v-if="data.clickType==='router'" label="路由名称">
      <el-select placeholder="请选择路由">
        <el-option></el-option>
      </el-select>
    </el-form-item>
    <!-- 弹窗相关-->
    <template v-if="data.clickType==='alert'">
      <el-form-item label="弹窗标题">
        <el-input v-model="data.alertTitle" placeholder="请输入弹窗标题"></el-input>
      </el-form-item>
      <el-form-item label="弹窗内容">
        <el-input v-model="data.alertContent" type="textarea" placeholder="请输入弹窗内容"></el-input>
      </el-form-item>
      <el-form-item label="确认按钮">
        <el-input v-model="data.alertConfirm" placeholder="请输入确认按钮文案"></el-input>
      </el-form-item>
      <el-form-item label="取消按钮">
        <el-input v-model="data.alertCancel" placeholder="请输入取消按钮文案"></el-input>
      </el-form-item>
    </template>
  </el-form>
</template>

<style scoped lang="scss">

</style>
