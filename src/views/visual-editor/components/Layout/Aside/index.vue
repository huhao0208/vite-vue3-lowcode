<script setup>

import draggable from 'vuedraggable'
import components from '@/views/visual-editor/components/Packages/index.js'
import useList from "./useList.js";
const {packages} = useList();

</script>
<template>
  <el-tabs tab-position="left" class="aside_tabs">
    <el-tab-pane v-for="tab in packages" :key="tab.type" :label="tab.label" lazy>
      <el-scrollbar height="calc(100vh - 80px)">
        <draggable item-key="id" :list="tab.components" :group="{ name: 'page', pull: 'clone', put: false }">

          <template #item="{ element }">
            <div class="child_item">
              <div class="label">{{ element.label }}</div>
              <component  :is="components[element.name]" :key="`${tab.type}/${element.name}`" style="position: relative;min-width: 50%"/>
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
  background-color: #fff;
  overflow: auto;

  :deep(.el-tabs__nav-scroll) {
    width: 100px;

    .el-tabs__nav {
      .el-tabs__item {
        user-select: none;

        &.is-active {
          background-color: #f3f5fd;
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
      }

      &:hover {
        outline: 1px solid blue;
      }

      .label {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 13px;
        z-index: 100;
        padding: 4px;
        background-color: rgba(135, 206, 235, 0.55);
      }
    }
  }
}
</style>
