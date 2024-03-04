<script setup>
import {defineEmits} from "vue";
import useModel from "ve/hooks/useModel.js";

defineOptions({
  name: 'BookCard',
  label: '文本',
  type: 'BusinessPackages',
  order: 1,
  config:{
    attrs:{

    },
    styles:{

    },
    outStyles:{},
    events: []
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
