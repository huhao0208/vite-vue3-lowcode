<script setup>
import {
  DArrowLeft,
  DArrowRight,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
const attrsOpen = ref(false)
const buttonIcon = computed(() => {
  return !attrsOpen.value ? DArrowLeft : DArrowRight;
});
</script>

<template>

  <el-container class="layout" >
    <el-header style="background-color: white">
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside>
        <Aside></Aside>

      </el-aside>
      <el-main style="position: relative" class="flex_row_center">
        <div class="page_edit_con">
          <slot name="main"></slot>
        </div>
        <div class="right_attrs" :class="{'right_attrs_open': attrsOpen}">
          <el-button :icon="buttonIcon" class="open_icon" link
                     @click="attrsOpen = !attrsOpen">

          </el-button>
          <!-- 右侧属性编辑-->
          <slot name="attrs"></slot>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">

.layout {
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  overflow: hidden;

}

.flex_row_center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  width: 100%;
  overflow: hidden;
  .page_edit_con{
    flex: 1;
    width: 100%;
    padding-left: calc(50% - 487.5px);
  }
  .right_attrs {
    height: 100%;
    background-color: #fff;
    position: relative;
    width: 0;
    transition: all .3s;
    &.right_attrs_open {
      width: 600px;
    }

    .open_icon {
      position: absolute;
      top: calc(50% - 40px);
      left: -30px;
      font-size: 20px;
      height: 80px;
      background-color: white;
      width: 30px;
      color: black;

    }
  }
}

</style>
