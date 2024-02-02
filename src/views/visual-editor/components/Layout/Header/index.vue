<script setup>
import {useTools} from "./useTools.jsx";
const tools = useTools()
console.log(tools,'tools')
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="header_container">
  <div class="left">
    <div @click="toggleDark()">{{!isDark?'暗色模式':'亮色模式'}}</div>
  </div>
    <div class="tools">
      <div v-for="tool in tools" :key="tool.title" class="tool" @click="tool.onClick()">
      <el-icon>
        <component :is="tool.icon" />
      </el-icon>
        <span>{{tool.title}}</span>
      </div>
    </div>
    <div class="right">
      <el-button>
        发布
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header_container{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .tools{
    display: flex;
    align-items: center;
    .tool{
      cursor: pointer;
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      span{
        margin-top: 8px;
        font-size: 12px;
      }
    }
  }
}
</style>
