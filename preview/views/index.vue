<script setup>
import {components} from 've/components/Packages'
import styleFmt, {processValue} from "@/utils/styleFmt.js";
import { showConfirmDialog } from 'vant';
import 'vant/lib/index.css';

console.log(components, 'components')
const pageJson = JSON.parse(sessionStorage.getItem("pageInfo"))
console.log(pageJson, 'pageJson')
const {pageConfig, list} = pageJson
console.log(styleFmt(pageConfig,{}),'styleFmt(pageConfig,{})')
const hotspotClickFun =async (e) => {
  console.log( '热区点击事件：', e)
  for (let i = 0; i < e.length; i++){
    await  eventHandler(e[i])
  }
}

const eventHandler  = e=>{
  return new Promise((resolve,reject)=>{
    console.log('eventHandler',e)
    switch (e.clickType) {
      case 'alert':
        showConfirmDialog({
          title: e.alertTitle,
          message: e.alertContent,
          confirmButtonText: e.alertConfirm,
          cancelButtonText: e.alertCancel,
          showCancelButton: !!e.alertCancel,
          // cancelButtonColor: e.attrs.cancelButtonColor,
          // confirmButtonColor: e.attrs.confirmButtonColor,
          showConfirmButton: !!e.alertConfirm,

        }).then(() => {
          resolve()
        }).catch((e) => {
          reject(e)
        })
        break;
      case 'link':
        console.log('跳转',e.link)
          location.href = e.link
            break;
        default:
          console.log('默认事件',e)
          resolve()
    }

  })
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
