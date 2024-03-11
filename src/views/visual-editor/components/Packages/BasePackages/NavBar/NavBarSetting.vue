<script setup>
import {defineEmits} from "vue";
import useModel from "ve/hooks/useModel.js";

// hotspot

defineOptions({
  name: 'NavBar',
  label: '顶部导航',
  type: 'BasePackages',
  order: 6,
  onlyOne: true, // 是否唯一 整个页面只能有一个
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
      fontSize: 17,
    },
    outStyles: {
      display: 'block',
      position: 'fixed',
      top: 0,
      left: 0,
      width: 375,
      height: 48,

      zIndex:99999999,
      background:'#fff'
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
  <SettingLayout>
    <template #attrs>
      <el-form label-width="100px">
         <el-form-item label="标题">
            <el-input  v-model="data.attrs.title"></el-input>
         </el-form-item>
        <el-form-item label="背景色">
          <el-color-picker v-model="data.outStyles.background" show-alpha></el-color-picker>
        </el-form-item>
        <el-form-item label="字体颜色">
          <el-color-picker v-model="data.styles.color" show-alpha></el-color-picker>
        </el-form-item>
      </el-form>
    </template>
<!--    <template #styles>-->
<!--      <el-form label-width="100px">-->

<!--      </el-form>-->
<!--    </template>-->
  </SettingLayout>
</template>

<style scoped lang="scss">

</style>
