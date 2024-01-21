<script setup>
const route = useRoute()
const data = ref(1)
</script>

<template>
  <Layout>
    <template v-slot:main>
      <PageEditor></PageEditor>
    </template>
    <template v-slot:attrs>
      <AttrsEditor></AttrsEditor>
    </template>

  </Layout>
</template>

<style scoped lang="scss">


</style>
