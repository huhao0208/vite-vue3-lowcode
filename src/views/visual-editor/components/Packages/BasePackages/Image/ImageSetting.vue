<script setup>
import {defineEmits} from "vue";
import useModel from "ve/hooks/useModel.js";

defineOptions({
  name: 'Image',
  label: '图片',
  type: 'BasePackages',
  order: 2,
  config: { // 默认配置
    attrs: {
      src:'https://img01.yzcdn.cn/vant/cat.jpeg',
      fit:'fill',

      class:''
    },
    styles: {
      height: 'auto',
    },
    outStyles: {
      width: 375,
        height: '',
    },
    events: [ ]
  },
})
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
})
const emit = defineEmits(['update:modelValue']);
const data = useModel(()=>props.modelValue || {},e=>emit('update:modelValue',e))


// contain	保持宽高缩放图片，使图片的长边能完全显示出来
// cover	保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边
// fill	拉伸图片，使图片填满元素
// none	保持图片原有尺寸
// scale-down	取 none 或 contain 中较小的一个
const fitObj = {
  contain: '保持宽高缩放图片，使图片的长边能完全显示出来',
  cover: '保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边',
  fill: '拉伸图片，使图片填满元素',
  none: '保持图片原有尺寸'
}
</script>

<template>
<SettingLayout>
  <template #attrs>

    <el-form label-width="100px">
      <el-form-item label="图片地址">
        <el-input v-model="data.attrs.src" placeholder="请输入图片地址" />
        <UploadImg :width="200"  :height="200" style="display:block" v-model="data.attrs.src"></UploadImg>
      </el-form-item>

<!--     <el-form-item label="缩放模式">-->
<!--       <el-select v-model="data.attrs.fit" placeholder="请选择缩放模式">-->
<!--         <el-option v-for="(value, key) in fitObj" :key="key" :label="value" :value="key" />-->
<!--       </el-select>-->

<!--     </el-form-item>-->
    </el-form>
  </template>
<!--  <template #events>-->
<!--    <el-form label-width="100px">-->
<!--      <el-form-item label="点击事件">-->
<!--        <el-input v-model="data.events.click" placeholder="请输入点击事件" />-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--  </template>-->
</SettingLayout>
</template>

<style scoped lang="scss">

</style>
