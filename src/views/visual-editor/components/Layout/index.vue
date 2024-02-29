<script setup>
import {
  DArrowLeft,
  DArrowRight,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'

const pStore = useCustomPage();
const attrsOpen = ref(true)
const buttonIcon = computed(() => {
  return !attrsOpen.value ? DArrowLeft : DArrowRight;
});
</script>

<template>
  <LayoutCom>
    <template #header>
      <Header></Header>
    </template>
    <template #aside>
      <Aside></Aside>
    </template>

    <template #main >
      <div  class="flex_row_center">
        <div class="page_edit_con">
          <slot name="main"></slot>
        </div>
        <div class="right_attrs" :hidden="!pStore.currentUid" :class="{'right_attrs_open': attrsOpen}">
          <el-button :icon="buttonIcon" class="open_icon" link
                     @click="attrsOpen = !attrsOpen">

          </el-button>
          <!-- 右侧属性编辑-->
          <slot name="attrs"></slot>
        </div>
      </div>
    </template>

  </LayoutCom>

</template>

<style scoped lang="scss">

:deep(.el-main){
  padding: 0!important;
  user-select: none;
}

.flex_row_center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  width: 100%;
  //overflow: hidden;
  //height: calc(99vh - var(--header-height));
  height: 100%;
  .page_edit_con {


    //width: calc(100% - 500px);
    //padding-top: 0;
    //padding-left: calc(50% - 500px);

    //height: calc(100vh - var(--header-height));

  }

  .right_attrs {
    height: 100%;
    background-color: #fff;
    position: relative;
    width: 600px;
    transition: all .3s;
    transform: translateX(100%);

    &.right_attrs_open {
      transform: translateX(0%);
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
<style>

</style>
