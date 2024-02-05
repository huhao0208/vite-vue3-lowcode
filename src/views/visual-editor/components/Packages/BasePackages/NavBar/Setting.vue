<script setup>
import {defineEmits} from "vue";
import useModel from "ve/hooks/useModel.js";

defineOptions({
  name: 'NavBar',
  label: '顶部导航',
  type: 'BasePackages',
  order: 6,
  config: {

    attrs: {
      placeholder: true,
      title: '标题',
      fixed: true,
      leftText: '返回',
      rightText: '搜索',
      leftIcon: "arrow-left"
    },
    styles: {
      // display: '',
      // position: ''
    },
    outStyles: {
      display: 'block',
      position: 'fixed',
      top: 0,
      left: 0,
      width: 375,
      height: 100
    },
    events: {}
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
  <SettingLayout>
    <template #attrs>
      <el-form label-width="100px">
        11111111111111
      </el-form>
    </template>
    <template #styles>
      <el-form label-width="100px">

      </el-form>
    </template>
  </SettingLayout>
</template>

<style scoped lang="scss">

</style>
