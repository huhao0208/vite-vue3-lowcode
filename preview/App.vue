<script setup>


</script>

<template>
  <router-view  #="{ Component, route }">
    <keep-alive>
      <component :is="Component" :key="route.path" />
    </keep-alive>
  </router-view>
</template>

<style scoped lang="scss">

</style>
