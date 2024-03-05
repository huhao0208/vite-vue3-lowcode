<script setup>


import SettingLayout from "ve/components/SettingLayout.vue";
import {defineEmits} from "vue";
import useModel from 've/hooks/useModel.js'
import {Position} from "@element-plus/icons-vue";

defineOptions({
  name: 'Hotspot',
  label: '热区',
  type: 'BasePackages',
  order: 1,
  config: { // 默认配置
    attrs: {},
    styles: {
      zIndex: 999999,
      position: 'absolute',
      top: 0,
      left: 0,
      width: 300,
      height: 200,

    },
    outStyles: {
      width: 0,
      height: 0,
      position: 'relative',
      top: 0,
      left: 0,
      overflow: 'visible',
      zIndex: 999999,
    },
    events: []
  }
})

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
    }
  }
})
const emit = defineEmits(['update:modelValue']);

const data = useModel(() => props.modelValue || {}, e => emit('update:modelValue', e))


const clickTypeObj = {
  request: {
    title: '发送请求',
    disabled: true
  },

  alert: {
    "title": "弹窗",
    "disabled": false
  },
  router: {
    "title": "路由",
    "disabled": true
  },
  link: {
    "title": "跳转",
    "disabled": false
  }
}

</script>

<template>

  <SettingLayout>

    <template #events>
      <el-form label-width="100px">
        <div v-for="(item,index) in  data.events" :key="item.type" class="event_card">
          <div class="left">
            {{ index + 1 }}
          </div>
          <div class="center">
            <EventItemConf v-model="data.events[index]" />

          </div>
          <div class="right">
            按钮xxx
          </div>
        </div>


        <div style="text-align:right">
          <el-button type="primary" @click="data.events.push({
        uid: uuid()
        })">
            添加事件
          </el-button>
        </div>
      </el-form>
    </template>
  </SettingLayout>

</template>

<style scoped lang="scss">
.event_card {
  display: flex;
  border: 1px solid #ccc;
  padding: 10px 0;
  margin: 10px 0;
  border-radius: 8px;
  align-items: center;
  position: relative;

  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: rgba(136, 136, 136, 0.22);
    border-radius: 4px;
    color: #267da2;
    font-size: 14px;
  }

  .center {
    flex: 1;
  }

  .right {

  }
}
</style>
