<script setup>
defineProps({
  txt: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div v-text="txt" >

  </div>
</template>

<style scoped lang="scss">

</style>
