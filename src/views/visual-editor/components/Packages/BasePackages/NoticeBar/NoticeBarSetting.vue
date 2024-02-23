<script setup>
import {defineEmits} from "vue";
import useModel from "ve/hooks/useModel.js";

defineOptions({
  name: 'NoticeBar',
  label: '通知组件',
  type: 'BasePackages',
  order: 4,
  config:{
    attrs:{
      text:'无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。',
      leftIcon:'volume-o',
    },
    styles:{
      // height:''
      display:'',

    },
    outStyles:{
      height:40
    },
    events:{}
  }
})
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
})
const emit = defineEmits(['update:modelValue']);
const data = useModel(()=>props.modelValue,e=>emit('update:modelValue',e))

</script>

<template>
  <SettingLayout>
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
          <el-input-number :min="0.8" :step="0.1" :max="100"  v-model="data.styles.lineHeight"></el-input-number>
        </el-form-item>
      </el-form>
    </template>
  </SettingLayout>
</template>

<style scoped lang="scss">

</style>
