<script setup>
const route = useRoute();


watch(()=>route.params.catalogId, (val) => {
  console.log(val, 'route.params.catalogId')
},{immediate: true});
</script>

<template>
 <div class="detail_container">
   detail {{ route.params.catalogId }}

   <HTable></HTable>
 </div>
</template>

<style scoped lang="scss">
.detail_container{
  width: 100%;
  height: 100%;
}
</style>
