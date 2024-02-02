<script setup>
const pStore = useCustomPage();
import useModel from "ve/hooks/useModel.js"
const detail = useModel(()=>pStore.currentDetail,val=>pStore.updateCurrentDetail(val))


</script>

<template>
  <el-form label-width="100px">
<!--    元素类型 块元素 行内块元素 行内元素-->
    <el-form-item label="元素类型">
       <el-select v-model="detail.styles.display">
         <el-option label="块元素(独占一行)" value="block" />
         <el-option label="行内块元素(不独占一行，宽度可自适应)" value="inline-block" />

       </el-select>
    </el-form-item>
    <el-form-item label="外边距">
      <el-slider v-model="detail.styles.opacity" :max="1" :step="0.01" />
    </el-form-item>
    <el-form-item label="宽度">
      <el-input v-model="detail.styles.width"  />
    </el-form-item>
    <!--    高度-->
    <el-form-item label="高度">
      <el-input v-model="detail.styles.height"  />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
