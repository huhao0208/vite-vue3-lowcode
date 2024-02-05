<script setup>
const props = defineProps({
  src: {
    type: String,
    default: '',
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
