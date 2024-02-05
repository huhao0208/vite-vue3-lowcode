<script setup>
defineProps({
  leftIcon: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <van-notice-bar
      :left-icon="leftIcon"
      :text="text"
  />
</template>

<style scoped lang="scss">

</style>
