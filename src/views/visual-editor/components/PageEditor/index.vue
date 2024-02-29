<script setup>
import useModel from "ve/hooks/useModel.js"

const pStore = useCustomPage();


const page = useModel(() => pStore.pageConfig, val => pStore.updatePageConfig(val))
</script>

<template>
  <el-form>
    <!--    背景颜色-->
    <el-form-item label="背景颜色">
      <div style="display: flex">
        <el-input v-model="page.backgroundColor"></el-input>
        <el-color-picker v-model="page.backgroundColor" show-alpha	/>
      </div>
    </el-form-item>
    <el-form-item label="背景图片">
<!--      <el-input  style="width: 300px;display:block" v-model="page.backgroundImage"></el-input>-->
      <UploadImg  style="display:block" v-model="page.backgroundImage"></UploadImg>
    </el-form-item>

  </el-form>
</template>

<style scoped lang="scss">

</style>
