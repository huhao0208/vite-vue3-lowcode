<script setup>
import CatalogAside from "./components/CatalogAside/index.vue"
import Detail from "./components/Detail.vue";
const aStore = useApp()
const pStore = useCustomPage()
const catalogStatus = ref('loading')
</script>

<template>
  <LayoutCom>
    <template #header>
<!--      页面管理-->
<!--      <template v-if="pStore?.classId"> - {{ pStore.classDetail?.className }}</template>-->
    </template>
    <template #aside>
      <CatalogAside style="width: 100%;height: 100%" @statusChange=" e=>catalogStatus = e" />
    </template>
    <template #main>
      <Detail v-show="catalogStatus!=='loading'"></Detail>
    </template>
  </LayoutCom>

</template>

<style scoped lang="scss">
.layout {
  width: 100vw;
  height: 100vh;

  .el-header {
    height: var(--header-height);
  }
}

.header, .aside {
  background-color: rgba(211, 209, 209, 0.34);
}

.header {
  border-bottom: 1px solid rgba(184, 184, 184, 0.34);
  display: flex;
  align-items: center;
}

.aside {
  border-right: 1px solid rgba(184, 184, 184, 0.34);
}
</style>
