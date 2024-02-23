<script setup>

import draggable from 'vuedraggable'
import {packageModules,settingComponents} from "ve/components/Packages"

console.log(packageModules,settingComponents,'settingComponents')
</script>
<template>
  <el-tabs tab-position="left" class="aside_tabs">
    <el-tab-pane v-for="(tab,type) in packageModules" :key="type" :label="tab.label" lazy>
      <el-scrollbar height="calc(100vh - 80px)">
        <draggable item-key="id" :list="Object.values(tab.components).sort((a,b)=>a.order-b.order)" :group="{ name: 'page', pull: 'clone', put: false }">

          <template #item="{ element }">
            <div class="child_item">
              <div class="label">{{ element.label }}</div>
              <component  :is="element.component" :key="`${type}/${element.name}`"
                          v-bind="settingComponents[element.name]?.config?.attrs"
                          style="position: relative;min-width: 100px; min-height: 40px;max-height:80px"/>
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
        background-color: rgba(0, 255, 255, 0.1);
        opacity: 0;
        transition: all 0.3s;
      }

      &:hover {
        outline: 1px solid blue;
        &:after{
          opacity: 1;
        }
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
