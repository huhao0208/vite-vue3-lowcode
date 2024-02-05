<script setup>
import {defineEmits} from "vue";
import useModel from "ve/hooks/useModel.js";

defineOptions({
  name: 'Swipe',
  label: '轮播',
  type: 'BasePackages',
  order: 5,
  config: {
    attrs: {
      autoplay: 3000,
      loop: true,
      indicator: true,
      indicatorPosition: 'outside',
      indicatorSize: 'small',
      indicatorColor: '#fff',
      autoplaySpeed: 3000,
      direction: 'horizontal',
      duration: 500,
      interval: 3000,
      list: [
        {
          id: 1,
          src: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          lazyLoad: false,
          fit: 'fill',
          link: 'https://wwww.baidu.com'
        },
        {
          id: 2,
          src: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          lazyLoad: false,
          fit: 'fill',
          link: 'https://wwww.baidu.com'
        }
      ]
    },
    styles: {},
    outStyles: {
      height: 200
    },
    events: {}
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
const data = useModel(() => props.modelValue, e => emit('update:modelValue', e))

</script>

<template>
  <SettingLayout>
    <template #attrs>
      <el-form label-width="100px">

      </el-form>
    </template>
    <template #styles>
      <el-form label-width="100px">

      </el-form>
    </template>
  </SettingLayout>
</template>

<style scoped lang="scss">

</style>
