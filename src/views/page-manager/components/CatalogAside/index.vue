<script setup>
  import AddCatalog from './AddCatalog.vue'
  import CatalogBtns from './CatalogBtns.vue'
  import useList from "@/hooks/useList.js";
  import {listThemeEditorClass} from "api";

  const {list,loadList,reload,status} = useList({
    listApi:listThemeEditorClass,
    listKey:'voList',
    immediate: true
  })


  const currentCatalogId  =ref('')
  const emit = defineEmits(['change'])
  const setCurrentFun = item=> {
    currentCatalogId.value = item.id
    emit('change',item)
  }



</script>

<template>
<div class="aside_container">
  <el-scrollbar  class="aside_content">
    <div v-for="item in list" :key="item.id" class="catalog_item" :class="{
      catalog_item_current: currentCatalogId === item.id
    }" @click="setCurrentFun(item)">
      <span class="name">{{item.className}} 水电费感受到工时费大哥大说法刚发打撒刚发是的第三方割发代首</span>
      <CatalogBtns></CatalogBtns>
    </div>
  </el-scrollbar>

 <div class="footer">

   <AddCatalog @addSuccess="reload()"></AddCatalog>
 </div>
</div>
</template>

<style scoped lang="scss">
.aside_container{

  overflow: hidden;
  .aside_content{
    height:calc(100vh - 50px - var(--header-height));

    .catalog_item{
      margin: 10px;
      border: 1px solid #ccc;
      padding-left:10px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 10px;
      cursor: pointer;
      .name{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
      }

      &:hover{
        background-color: rgba(5, 72, 245, 0.04);
      }
      &.catalog_item_current{
        background-color: rgba(5, 72, 245, 0.14);
      }
    }
  }
  .footer{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
