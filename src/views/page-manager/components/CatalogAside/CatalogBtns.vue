<script setup>
import {MoreFilled, Plus} from "@element-plus/icons-vue";

</script>

<template>
<div class="catalog_btns">
  <el-icon style="transform: rotate(90deg)" @click.stop=""><MoreFilled /></el-icon>
  <el-icon  @click.stop=""><Plus /></el-icon>

</div>
</template>

<style scoped lang="scss">
.catalog_btns{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .el-icon{
    padding: 10px;

  }
}
</style>
