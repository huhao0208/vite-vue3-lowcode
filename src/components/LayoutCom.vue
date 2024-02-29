<script setup>
const aStore = useApp()
 

</script>

<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="breadcrumbs">
        <el-breadcrumb >
          <el-breadcrumb-item v-for="item in aStore.breadcrumb" :key="item?.path" :to="item?.path">{{ item?.title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <slot name="header">

      </slot>
    </el-header>
    <el-container>
      <el-aside class="aside">
        <slot name="aside"></slot>
      </el-aside>
      <el-main style="position: relative;padding: 0" class="main">
        <el-scrollbar class="main_scroll">
          <slot name="main"></slot>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.layout {
  //width:100vw;
  //height: 100vh;
  box-sizing: border-box;
  overflow: hidden;

  .el-header {
    height: var(--header-height);
    width: 100vw;
  }

  .header, .aside {
    background-color: rgba(211, 209, 209, 0.24);
    overflow-x: hidden;
  }

  .header {
    border-bottom: 1px solid rgb(98, 97, 97);
    display: flex;
    align-items: center;
    height: var(--header-height);
    position: relative;
    .breadcrumbs{
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      white-space: nowrap;
      display: flex;
      align-items: center;
      padding-left: 20px;
    }
  }

  .aside {
    width: var(--aside-width);
    border-right: 1px solid rgb(98, 97, 97);
    height: calc(100vh - var(--header-height));
  }

  .main {
    width: calc(100vw - var(--aside-width));
    height: calc(100vh - var(--header-height));
    //overflow: scroll;


    .main_scroll {
      height: calc(100vh - var(--header-height));

    }
  }
}


</style>
