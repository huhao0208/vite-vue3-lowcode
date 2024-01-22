<script setup>
import draggable from 'vuedraggable';
import {getComponent} from '../Packages/loadComponent.js';

const pageStore = useCustomPage();

// 使用 computed 属性来代替手动的 list，确保在 Vuex store 中的 list 更新时也会更新
const list = computed({
  get() {
    return pageStore.list;
  },
  set(newValue) {
    pageStore.updateList(newValue)
  }
})

</script>


<template>
  <el-scrollbar height="667" class="phone_container">

    <draggable group="page" v-model="list"
               item-key="uid" style="min-height: 667px">
      <template #item="{ element }">
        <div class="list_group_item" @click="element.click">
          <!--          {{ element.label }}-->
          <component :is="getComponent(element.type,element.name)" :key="element.uid"></component>
        </div>
      </template>
    </draggable>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.phone_container {
  transform: scale(1);
  width: 375px;
  min-height: 667px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  overflow-x: hidden;

  position: relative;
  transition: all .3s;

  .list_group_item {

  }
}
</style>
