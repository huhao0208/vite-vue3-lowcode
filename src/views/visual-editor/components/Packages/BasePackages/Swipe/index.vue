<script setup>
const props = defineProps({
  autoplay: {
    type: [Boolean,Number],
    default: 3000
  },
  loop: {
    type: Boolean,
    default: true
  },
  indicator: {
    type: Boolean,
    default: true
  },
  indicatorColor:{
    type: String,
    default: 'white'
  },
  showIndicators: {
    type: Boolean,
    default: false
  },
  list: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <van-swipe class="my-swipe"  v-bind="props">
    <van-swipe-item  :style="`background:url(${item.src}) center center/100% 100% no-repeat;`"  v-for="item in list" :key="item.id"> </van-swipe-item>


  </van-swipe>
</template>

<style scoped lang="scss">
.my-swipe{
  width: 100%;
}
</style>
