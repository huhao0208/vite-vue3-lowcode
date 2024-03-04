<script setup>
import {components} from 've/components/Packages'
import styleFmt, {processValue} from "@/utils/styleFmt.js";

console.log(components, 'components')
const pageJson = JSON.parse(sessionStorage.getItem("pageInfo"))
console.log(pageJson, 'pageJson')
const {pageConfig, list} = pageJson
console.log(styleFmt(pageConfig,{}),'styleFmt(pageConfig,{})')
const hotspotClickFun = (e) => {
  console.log( '热区点击事件：', e)
}
</script>

<template>
  <div :style="styleFmt(pageConfig,{})" class="page_container">


    <template v-for="item in list" >
      <div @click="hotspotClickFun(item.events)" :key="item.uid" v-if="item.name==='Hotspot'" v-bind="{
        ...item.attrs,
        style: styleFmt(item.styles,{
          unit:'vw',
          baseSize:37.5
        })
      }"> </div>

    <div  v-else :key="item.uid" :style="styleFmt(item.outStyles,{
          unit:'rem',
          baseSize:37.5
   })">
      <component   :is="components[item.name]" v-bind="{
        ...item.attrs,
        style: styleFmt(item.styles,{
          unit:'vw',
          baseSize:37.5
        })
      }"></component>
    </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.page_container {
  min-height: 100vh;
}
</style>
