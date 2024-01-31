<script setup>
import draggable from 'vuedraggable';
import {components} from 've/components/Packages'

console.log(components,'components')

const pStore = useCustomPage();

// 使用 computed 属性来代替手动的 list，确保在 Vuex store 中的 list 更新时也会更新
const list = computed({
  get() {
    return pStore.list
  },
  set(newValue) {
    const list = newValue.map(item => {
    delete item.component
      delete item.settingComponent
      return item
    })
    pStore.updateList(list)
  }
})

import useCurrent from '../../hooks/useCurrent.js';

const {currentUid, setCurrentUid} = useCurrent()
const menuItems = [
  {label: '复制', disabled: false, type: 'copy'},
  {label: '删除', disabled: false, type: 'delete'},
];

const cantCopyList = ['NavBar'];
const cantDeleteList = [ ];

const getMenuItems = (element) => {
  return menuItems.map(item => {
    return {
      ...item,
      disabled:cantCopyList.includes(element.name)&&item.type==='copy' || cantDeleteList.includes(element.name)&&item.type==='delete',
      onClick: () => {
        console.log(element, item.label,list)
       item.type==='copy'? pStore.updateList([...list.value,{
         ...element,
         uid:''
       }]) :pStore.updateList(list.value.filter(e=>e.uid!==element.uid))
      }
    }
  })
}
</script>


<template>
  <el-scrollbar height="667" class="phone_container">
    <draggable group="page" v-model="list"
               item-key="uid" style="min-height: 667px">
      <template #item="{ element }">
        <div class="list_group_item" :class="{
          list_group_item_current: currentUid===element.uid
        }" @click="setCurrentUid(element.uid)" v-contextmenu="{menuItems:getMenuItems(element)}"
          :style="element.styles"
        >
          <component :is="components[element.name]?.component" :key="element.uid" v-bind="{
            ...element.attrs,
            style: element.styles
          }" v-on="element.events"></component>
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
    position: relative;
    &:hover{
      &:before{
        position: absolute;
        box-sizing: border-box;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border: 2px solid #FF0000;
        z-index: 999999999999
      }
    }
    //transform: scale(1);
    &.list_group_item_current {

      &:after {
        content: '';
        position: absolute;
        box-sizing: border-box;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border: 2px solid #FF0000;
        z-index: 999999999999

      }
    }
  }
}
</style>
