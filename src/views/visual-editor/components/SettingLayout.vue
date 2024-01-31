<script>
export default {
  name: "SettingLayout"
}
</script>

<template>
  <el-tabs type="border-card"  class="settings">
    <el-tab-pane label="属性设置">
      <slot name="attrs"></slot>
    </el-tab-pane>
    <el-tab-pane label="样式设置">
      <slot name="styles"></slot>
    </el-tab-pane>
    <el-tab-pane label="事件配置">
      <slot name="events"></slot>
    </el-tab-pane>
    <el-tab-pane label="页面设置">Task</el-tab-pane>
  </el-tabs>


</template>

<style scoped lang="scss">
.settings{
  height: calc(100vh - var(--header-height));
  :deep(.el-tabs__header){
    height: 40px;
  }
 :deep(.el-tabs__content){
    height: calc(100% - 40px);
    overflow-y: auto;
   box-sizing: border-box;
  }
}
</style>
