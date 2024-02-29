<script setup>
import {components} from 've/components/Packages'
import styleFmt, {processValue} from "@/utils/styleFmt.js";

console.log(components, 'components')
const pageJson = JSON.parse(sessionStorage.getItem("pageInfo"))
console.log(pageJson, 'pageJson')
const {pageConfig, list} = pageJson
console.log(styleFmt(pageConfig,{}),'styleFmt(pageConfig,{})')

</script>

<template>
  <div :style="styleFmt(pageConfig,{})" class="page_container">


    <div v-for="item in list" :key="item.uid" :style="styleFmt(item.outStyles,{
          unit:'rem',
          baseSize:37.5
   })">
      <div v-if="item.name==='Hotspot'" v-bind="{
        ...item.attrs,
        style: styleFmt(item.styles,{
          unit:'vw',
          baseSize:37.5
        })
      }">

      </div>

      <component v-else :is="components[item.name]" v-bind="{
        ...item.attrs,
        style: styleFmt(item.styles,{
          unit:'vw',
          baseSize:37.5
        })
      }"></component>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page_container {
  min-height: 100vh;
}
</style>
