<script setup>
import {defineEmits} from "vue";

defineOptions({
  name: 'Image',
  label: '图片',
  type: 'BasePackages',
  order: 2
})
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
})
const emit = defineEmits(['update:modelValue']);
const data = computed({
  get() {
    const {attrs={},events={},styles={},...arg} = props.modelValue||{}
    return {
      attrs,
      events,
      styles,
      ...arg
    }
  },
  set(value) {
    emit('update:modeValue', value)
  }
})

// contain	保持宽高缩放图片，使图片的长边能完全显示出来
// cover	保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边
// fill	拉伸图片，使图片填满元素
// none	保持图片原有尺寸
// scale-down	取 none 或 contain 中较小的一个
const fitObj = {
  contain: '保持宽高缩放图片，使图片的长边能完全显示出来',
  cover: '保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边',
  fill: '拉伸图片，使图片填满元素',
  none: '保持图片原有尺寸',
  scaleDown: '取 none 或 contain 中较小的一个'
}
</script>

<template>
<SettingLayout>
  <template #attrs>

    <el-form label-width="100px">
      <el-form-item label="图片地址">
        <el-input v-model="data.attrs.src" placeholder="请输入图片地址" />
      </el-form-item>

     <el-form-item label="缩放模式">
       <el-select v-model="data.attrs.fit" placeholder="请选择缩放模式">
         <el-option v-for="(value, key) in fitObj" :key="key" :label="value" :value="key" />
       </el-select>

     </el-form-item>
    </el-form>
  </template>
  <template #events>
    <el-form label-width="100px">
      <el-form-item label="点击事件">
        <el-input v-model="data.events.click" placeholder="请输入点击事件" />
      </el-form-item>
    </el-form>
  </template>
</SettingLayout>
</template>

<style scoped lang="scss">

</style>
