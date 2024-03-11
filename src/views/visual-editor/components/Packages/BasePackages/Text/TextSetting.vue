<script setup>
import {defineEmits} from "vue";
import useModel from "ve/hooks/useModel.js";

defineOptions({
  name: 'Text',
  label: '文本',
  type: 'BasePackages',
  order: 4,
  config: {
    attrs: {
      txt: '这是一段文本内容\n支持换行'
    },
    styles: {
      whiteSpace: 'pre-wrap',
      lineHeight: 1.5,
      fontSize: 16,
      height: '',
      textAlign: 'left',
      color: '#000',
      whitespace: 'pre-wrap',
    },
    outStyles: {
      height: ''
    },
    events: []
  }
})
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
    }
  }
})
const emit = defineEmits(['update:modelValue']);
const data = useModel(() => props.modelValue, e => emit('update:modelValue', e))

</script>

<template>
  <SettingLayout :styleConf="{
animate: true,
padding: true,
width: false,
height: false,
aline: false,
}">
    <template #attrs>
      <el-form label-width="100px">
        <el-form-item label="文本内容">
          <el-input type="textarea" rows="5" v-model="data.attrs.txt" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #styles>
      <el-form label-width="100px">
        <el-form-item label="行高">
          <el-input-number :min="1" :step="0.1" :max="100" v-model="data.styles.lineHeight"></el-input-number>
        </el-form-item>
        <el-form-item label="字体大小">
          <el-input-number :min="12" :step="1" :max="40" v-model="data.styles.fontSize"></el-input-number>
        </el-form-item>
        <el-form-item label="文本颜色">
          <el-color-picker v-model="data.styles.color"></el-color-picker>
        </el-form-item>
        <el-form-item label="文本对齐">
          <el-radio-group v-model="data.styles.textAlign">
            <el-radio label="left">左对齐</el-radio>
            <el-radio label="center">居中</el-radio>
            <el-radio label="right">右对齐</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
    </template>
  </SettingLayout>
</template>

<style scoped lang="scss">

</style>
