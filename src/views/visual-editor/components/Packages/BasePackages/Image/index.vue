<script setup>
const props = defineProps({
  src: {
    type: String,
    default: 'https://img01.yzcdn.cn/vant/cat.jpeg',
  }
})
</script>

<template>

  <van-image
      v-bind="props"
  />
</template>

<style scoped lang="scss">

</style>
