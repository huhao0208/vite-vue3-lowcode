
每个组件需要一个独立文件夹，文件夹名称为组件名称 如 Button ，文件夹下需要有以下文件
1. index.vue  这个是预览组件
2. ButtonSetting.vue  这个是配置组件,用于配置组件样式属性以及事件
setting组件详细介绍如下
```vue
<script setup>
  // import SettingLayout from "ve/components/SettingLayout/index";
  import {defineEmits } from "vue";
  import useModel from 've/hooks/useModel.js'

  defineOptions({
    name: 'Button', // 组件名称 与外层文件名称一致
    label: '按钮', // 组件文字标识
    type: 'BasePackages', // 组件归属类型
    order: 1, // 侧边栏顺序
    _hidden: true, // 侧边是否隐藏
    config: { // index组件的默认值配置   
      attrs: {
        type: 'primary',
        text:'按钮'
      },
      styles: { // 组件样式
        fontSize: 14 //单位不要带px 代码自动处理
      },
      outStyles: {  // 组件外层容器样式
        width: 375,  //单位不要带px 代码自动处理
        height: 40,
      },
      events:  [] // 事件列表 默认为click事件
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

  const data = useModel(()=>props.modelValue || {},e=>emit('update:modelValue',e))



 

</script>

<template>

  <SettingLayout :styleConf="{
animate: true, // 是否开启动画配置
padding: true, // 是否开启边距配置
width: true, // 是否开启宽度配置
height: false, // 是否开启高度配置
aline: true, // 是否开启水平排列配置
}">
<!-- attrs配置-->
    <template #attrs>
      <el-form label-width="100px">
        <el-form-item label="按钮名称">
          <el-input v-model="data.attrs.text" placeholder="请输入按钮名称"></el-input>
        </el-form-item>
      </el-form>
    </template>
<!-- 组件样式配置-->
    <template #styles>
      <el-form label-width="100px">
        <!--          字体大小-->
        <el-form-item label="字体大小">
          <el-input v-model="data.styles.fontSize" label="字体大小"></el-input>
        </el-form-item>
      </el-form>
    </template>
<!--    组件事件配置-->
    <template #events>
      <el-form label-width="100px">
       
      </el-form>
    </template>
  </SettingLayout>

</template>

<style scoped lang="scss">

</style>

```
