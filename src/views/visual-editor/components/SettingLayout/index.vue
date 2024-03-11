<script>

import ComEventsConfig from "./ComEventsConfig.vue";

export default {
  name: "SettingLayout",
  components: {ComEventsConfig},
  props: {
    styleConf: {
      type: Object,
      default: () => ({})
    },
    attrConf: {
      type: Object,
      default: () => ({})
    },
    eventConf: {
      type: Object,
      default: () => ({})
    }
  },
  computed:{

  }
}
</script>

<template>
  <el-tabs type="border-card" class="settings">
    <el-tab-pane label="属性设置" v-if="$slots.attrs">
      <slot name="attrs"></slot>
    </el-tab-pane>
    <el-tab-pane label="样式设置" v-if="$slots.styles ||Object.keys(styleConf).length">

      <!--      &lt;!&ndash;通用样式配置&ndash;&gt;-->
      <ComStylesConfig  :config="styleConf"/>
      <slot name="styles"></slot>
    </el-tab-pane>
    <el-tab-pane label="事件配置" v-if="$slots.events">
      <!-- 点击事件-->
      <ComEventsConfig></ComEventsConfig>

      <slot name="events"></slot>
    </el-tab-pane>
    <el-tab-pane label="页面设置">
      <PageEditor></PageEditor>
    </el-tab-pane>
  </el-tabs>


</template>

<style scoped lang="scss">
.settings {
  //height: 100%;
  height: calc(100vh - var(--header-height));

  :deep(.el-tabs__header) {
    height: 40px;
  }

  :deep(.el-tabs__content) {
    height: calc(100% - 40px);
    overflow-y: auto;
    box-sizing: border-box;
    padding: 20px 10px 20px 20px;
  }

  :deep(.el-form-item__label) {
    text-align: center;
  }
}
</style>
