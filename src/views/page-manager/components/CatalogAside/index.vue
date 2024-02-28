<script setup>
import AddCatalog from './AddCatalog.vue'
import CatalogBtns from './CatalogBtns.vue'
import useList from "@/hooks/useList.js";
const emit = defineEmits()

import {listThemeEditorClass} from "api";

const {list, loadList, reload, status} = useList({
  listApi: listThemeEditorClass,
  listKey: 'voList',
  immediate: true
})


const pStore = useCustomPage();

const updateTable = (item) => {
  pStore.setClassDetail(item)
}

watch( ()=>status.value, (val) => {
  console.log(val,'status')
  emit('statusChange',val)
},{
  immediate: true
})


const setCurrent = (item) => {
  pStore.setClassDetail(item)

}


defineExpose({list, status})
</script>

<template>
  <div class="aside_container" v-loading="status.loading">
    <el-scrollbar class="aside_content">
      <div v-for="item in list" :key="item.id" class="catalog_item" :class="{
      catalog_item_current: pStore?.classId === item.id
    }" @click="setCurrent(item)">
        <span class="name">{{ item.className }}</span>
        <CatalogBtns :details="item" @success="reload()" @updateTable="updateTable"></CatalogBtns>
      </div>
    </el-scrollbar>

    <div class="footer">

      <AddCatalog @addSuccess="reload()"></AddCatalog>
    </div>


  </div>
</template>

<style scoped lang="scss">
.aside_container {

  overflow: hidden;

  .aside_content {
    height: calc(100vh - 50px - var(--header-height));

    .catalog_item {
      margin: 10px;
      border: 1px solid #ccc;
      padding: 0 5px 0 10px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 10px;
      cursor: pointer;

      .name {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
      }

      &:hover {
        background-color: rgba(5, 72, 245, 0.04);
      }

      &.catalog_item_current {
        background-color: rgba(5, 72, 245, 0.14);
      }
    }
  }

  .footer {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
