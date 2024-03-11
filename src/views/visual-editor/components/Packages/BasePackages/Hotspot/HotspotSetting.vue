<script setup>

import {defineEmits} from "vue";
import useModel from 've/hooks/useModel.js'


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

</script>

<template>

  <SettingLayout>

    <template #events>

    </template>


  </SettingLayout>

</template>

<style scoped lang="scss">
.events_empty {
  text-align: center;
  font-size: 14px;
  color: #4f4e4e;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

}

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
    padding-top: 18px;
    flex: 1;
  }

  .right {
    //width: 60px;
    margin: 0 10px;
    height: 100%;
    display: flex;
    align-items: center;

    span {
      display: inline-block;
      padding: 6px;
      cursor: pointer;

      &.move {
        cursor: move;
      }
    }
  }
}
</style>
