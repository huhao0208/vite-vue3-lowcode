<script setup>
import draggable from 'vuedraggable';
import {components} from 've/components/Packages'

console.log(components, 'components')

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
const cantDeleteList = [];

const getMenuItems = (element) => {
  return menuItems.map(item => {
    return {
      ...item,
      disabled: cantCopyList.includes(element.name) && item.type === 'copy' || cantDeleteList.includes(element.name) && item.type === 'delete',
      onClick: () => {
        console.log(element, item.label, list)
        item.type === 'copy' ? pStore.updateList([...list.value, {
          ...element,
          uid: ''
        }]) : pStore.updateList(list.value.filter(e => e.uid !== element.uid))
      }
    }
  })
}

const pageStyles = toRef(pStore.pageConfig)
</script>


<template>
  <el-scrollbar height="667" class="phone_container" :style="{
    ...pageStyles,
    backgroundImage:`url(${pageStyles.backgroundImage})`,

  }" :class="{
    'phone_container_current': currentUid
  }">
    <draggable group="page" v-model="list"
               item-key="uid" style="min-height: 667px">
      <template #item="{ element }">
        <div class="list_group_item" :class="{
          list_group_item_current: currentUid===element.uid
        }" @click="setCurrentUid(element.uid)" v-contextmenu="{menuItems:getMenuItems(element)}"
             :style="element.outStyles"
        >
          <div class="list_group_item_inner">
            <component :is="components[element.name]?.component" :key="element.uid"
                       :events="element.events"
                       style="pointer-events: none"
                       v-bind="{ ...element.attrs, style: element.styles }"></component>
          </div>
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
  //border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  overflow-x: hidden;

  position: relative;
  transition: all .3s;

  .list_group_item {
    position: relative;
    cursor: pointer;

    &.list_group_item_current {

      &:after {
        content: '';
        position: absolute;
        box-sizing: border-box;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: transparent;
        //border: 2px dashed #0048ff;
        border: 1px solid transparent; /* 设置透明的边框 */
        border-image: repeating-linear-gradient(45deg, yellow 0, red 2px, green 4px) 2; /* 设置渐变图片作为边框，切片和宽度都为 10px，角度为 45 度，颜色停止点为 10px 和 20px */
      }
    }
    &:hover:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .1);
      z-index: 9999;

    }



  }
}
</style>
