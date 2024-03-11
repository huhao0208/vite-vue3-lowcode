<script setup>

import draggable from 'vuedraggable'
import {packageModules, settingComponents} from "ve/components/Packages"

// console.log(packageModules, settingComponents, 'settingComponents')
// const onDragStart = (e) => {
//   console.log(e,'onDragStart a')
// }
// const onDragging = (e) => {
//     const {layerX,layerY} = e
// //   console.log(e,layerX,layerY, 'onDragging b')
// // }
//   console.log(e,layerX,layerY,'onDragging a')
// }
// const onDragEnd = (e) => {
//   console.log(e,'onDragEnd a')
// }
// const changeFun = e=>{
//   console.log(e,'changeFun a')
// }
// 克隆组件
const cloneDog = (comp) => {
  console.log('当前拖拽的组件：', comp);

  return comp
};
</script>
<template>
  <el-tabs tab-position="left" class="aside_tabs">
    <el-tab-pane v-for="(tab,type) in packageModules" :key="type" :label="tab.label" lazy>
      <el-scrollbar height="calc(100vh - 80px)">
        <draggable item-key="id" :list="Object.values(tab.components).sort((a,b)=>a.order-b.order).filter(item=>!item._hidden)"
                    :clone="cloneDog"  :sort="false"
                   :group="{ name: 'page', pull: 'clone', put: false }"
                   :fallback-class="false"
                   :fallback-on-body="false"
                   :scrollSensitivity="20"

        >

          <template #item="{ element }">
            <div class="child_item">

              <component   :is="element.component" :key="`${type}/${element.name}`"
                         v-bind="settingComponents[element.name]?.config?.attrs"
                         class="child_item_com"
                         :class="element.name"
                         isPreview
                        />

              <div class="label">{{ element.label }}</div>
            </div>
          </template>
        </draggable>

      </el-scrollbar>

    </el-tab-pane>

  </el-tabs>
</template>

<style scoped lang="scss">
.aside_tabs {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  overflow: auto;

  :deep(.el-tabs__nav-scroll) {
    width: 100px;

    .el-tabs__nav {
      .el-tabs__item {
        user-select: none;

        &.is-active {
          background-color: #ffffff;
        }
      }
    }

  }


  :deep(.el-tabs__content) {

    padding: 0;

    .child_item {
      transform: scale(1);
      box-sizing: border-box;
      position: relative;
      height: 80px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #888888;
      margin: 10px;
      user-select: none;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999999;
        cursor: move;
        background-color: rgba(0, 255, 255, 0.1);
        opacity: 0;
        transition: all 0.3s;
      }

      &:hover {
        outline: 1px solid blue;

        &:after {
          opacity: 1;
        }
      }

      .label {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 13px;
        z-index: 1000;
        padding: 4px;
        background-color: rgba(135, 206, 235, 0.55);
      }

      .child_item_com {
        position: relative;
        z-index: 100;
        transform: scale(1);
        pointer-events: none;
        min-width: 100px;
        min-height: 40px!important;

        &.Swipe{
          height: 100%;
          .van-swipe-item{
            height: 100%;
          }
        }

        &.Hotspot {
          text-align: center;
          background:rgba(255, 0, 0, 0.2);
          color: rgb(255, 109, 3);
          :deep(.vdr-container) {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            color: #fff;

          }
        }
      }
    }



    .drag-class{
      background: blue;
      .label{
        display: none!important;
      }
    }
  }
}
</style>
