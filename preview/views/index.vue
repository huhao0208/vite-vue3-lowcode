<script setup>
import {components} from 've/components/Packages'

console.log(components,'components')
const pageJson = JSON.parse(localStorage.getItem("customPage"))
console.log(pageJson)
const {pageConfig,list} = pageJson


</script>

<template>
  <div :style="pageConfig" class="page_container" style="width: 375px">
<!--    {{list}}-->

    <component v-for="item in list" :key="item.uid" :is="components[item.name]" v-bind="{
        ...item.attrs,
        style:item.styles
      }"></component>
  </div>
</template>

<style scoped lang="scss">
.page_container{
  min-height: 100vh;
}
</style>
