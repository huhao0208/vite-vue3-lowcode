<script setup>


import SettingLayout from "ve/components/SettingLayout.vue";
import {defineEmits } from "vue";
import useModel from 've/hooks/useModel.js'

defineOptions({
  name: 'Hotspot',
  label: '热区',
  type: 'BasePackages',
  order: 1,
  config: { // 默认配置
    attrs: {

    },
    styles: {
      zIndex:999999,
      position: 'absolute',
      top: 0,
      left: 0,
      width: 300,
      height: 200,

    },
    outStyles: {
      width: 0,
      height: 0,
      position: 'relative',
      top: 0,
      left: 0,
      overflow:'visible',
      zIndex:999999,
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

const data = useModel(()=>props.modelValue || {},e=>emit('update:modelValue',e))





const clickTypeObj = {
  request: {
    title:'发送请求',
    disabled: true
  },

  alert:  {
    "title": "弹窗",
    "disabled": false
  },
  router:  {
    "title": "路由",
    "disabled": false
  },
  link: {
    "title": "跳转",
    "disabled": false
  }
}

</script>

<template>

  <SettingLayout>




    <template #events>
      <el-form label-width="100px">
        <el-form-item label="点击事件">
          <!--      选择  发送请求 弹窗-->
          <el-select v-model="data.events.clickType" placeholder="请选择">
            <el-option v-for="(label,key) in clickTypeObj" :key="key" :label="label" :value="key"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="data.events.clickType==='link'" label="跳转地址">
          <el-input :placeholder="`请输入跳转链接`"></el-input>
        </el-form-item>
        <el-form-item v-if="data.events.clickType==='router'" label="路由名称">
          <el-select placeholder="请选择路由">
            <el-option></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </template>
  </SettingLayout>

</template>

<style scoped lang="scss">

</style>
