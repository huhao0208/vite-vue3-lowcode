<script setup>
import draggable from 'vuedraggable';
import useModel from "ve/hooks/useModel.js";
import {components} from "ve/components/Packages/index.js";
import styleFmt from "utils/styleFmt.js";
import useCurrent from "ve/hooks/useCurrent.js";
import {toRaw} from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['update:modelValue'])

const list = useModel(() => props.modelValue, (newValue) => emit('update:modelValue', newValue))

const {currentUid, setCurrentUid} = useCurrent()
const menuItems = [
  {label: '复制', disabled: false, type: 'copy'},
  {label: '删除', disabled: false, type: 'delete'},
];
const cantCopyList = ['NavBar'];
const cantDeleteList = [];
const getMenuItems = (element) => {
  const { name, uid,...args } = element
  return menuItems.map(item => {
    return {
      ...item,
      disabled: cantCopyList.includes(name) && item.type === 'copy' || cantDeleteList.includes(name) && item.type === 'delete',
      onClick: () => {
        let newList = toRaw(list.value)
        switch (item.type) {
            case 'copy':
              newList.push({
                name,
                ...args,
                uid:''
              })
              break;
              case 'delete':
                newList =  newList.filter(e => e.uid !== uid)
                break;
            default:
                break;
        }
        emit('update:modelValue', newList)
        // console.log(item.type, uid,newList,'list')

      }
    }
  })
}

</script>

<template>
  <draggable :group="{ name: 'page',  pull: false,put:true }" v-model="list" class="group_list" item-key="uid">
    <template #item="{ element }">


      <div   @click="setCurrentUid(element.uid)" v-contextMenu="{menuItems:getMenuItems(element)}"
           :style="styleFmt( element.outStyles,{})" :class="{
              list_group_item:true,
              [`list_group_item_${element.name}`]:true,
              list_group_item_current: currentUid === element.uid
            }">

        <component v-if="element.name === 'Hotspot'" :is="components[element.name]" :key="element.uid"
                   :uid="element.uid"
                   :events="element.events"
                   v-model="element.styles"
                   v-bind="{ ...element.attrs }"></component>

        <component v-else :is="components[element.name]" :key="element.uid"
                   :uid="element.uid"
                   :events="element.events"
                   style="pointer-events: none"
                   v-bind="{ ...element.attrs, style:styleFmt( element.styles,{}) }"></component>

      </div>

    </template>
  </draggable>
</template>

<style scoped lang="scss">
.group_list{
  position: relative;
}
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
      pointer-events: none;
      z-index: 99999999999999;
      //border: 2px dashed #0048ff;
      border: 2px solid transparent; /* 设置透明的边框 */
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
    pointer-events: none;
    background-color: rgba(0, 0, 0, .1);
    z-index: 9999999999999;

  }

  &.list_group_item_Hotspot{
   :deep(.vdr-container) {
      background-color: rgba(255, 0, 0, .2);
    }
  }

}

.child_group {
  position: relative;

  &:hover:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-color: rgba(0, 0, 0, .1);
    z-index: 9999999999999;

  }

}
</style>
