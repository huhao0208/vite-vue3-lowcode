<script setup>
import CatalogAside from "./components/CatalogAside/index.vue"
import Detail from "./components/Detail.vue";
const currentCatalog = ref(null)
</script>

<template>
  <el-container class="layout" >
    <el-header  class="header" >
      页面管理<template v-if="currentCatalog?.className"> - {{currentCatalog.className}} </template>
    </el-header>
    <el-container>
      <el-aside class="aside">
        <CatalogAside style="width: 100%;height: 100%" @change="e=>currentCatalog = e"/>
      </el-aside>
      <el-main style="position: relative" class="flex_row_center">
        <Detail ></Detail>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.layout{
  width: 100vw;
  height: 100vh;
  .el-header{
    height: var(--header-height);
  }
}
.header,.aside{
  background-color: rgba(211, 209, 209, 0.34);
}
.header{
  border-bottom: 1px solid rgba(184, 184, 184, 0.34);
  display: flex;
  align-items: center;
}
.aside{
  border-right: 1px solid rgba(184, 184, 184, 0.34);
}
</style>
