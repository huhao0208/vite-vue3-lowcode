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
  list: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <van-swipe class="my-swipe"  v-bind="props">
    <van-swipe-item v-for="item in list" :key="item.id">
      <van-image :src="item.src" :lazy-load="item.lazyLoad" :fit="item.fit"></van-image>
    </van-swipe-item>


  </van-swipe>
</template>

<style scoped lang="scss">
.my-swipe{
  width: 100%;
}
</style>
