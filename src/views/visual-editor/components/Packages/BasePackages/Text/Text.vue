<script setup>
defineProps({
  txt:{
    type:String,
    default:'文本内容'
  }
})
</script>

<template>
  <div>
    {{ txt }}
  </div>
</template>

<style scoped lang="scss">

</style>
