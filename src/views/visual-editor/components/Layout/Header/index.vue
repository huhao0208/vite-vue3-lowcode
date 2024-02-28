<script setup>
import {useTools} from "./useTools.jsx";
const tools = useTools()
console.log(tools,'tools')
import { useDark, useToggle } from '@vueuse/core'
import {updateThemeEditorDetailContent} from "api";

const isDark = useDark()
const toggleDark = useToggle(isDark)

const router = useRouter()
const route = useRoute()
const pStore = useCustomPage()
const submit = () => {
  updateThemeEditorDetailContent({
    id:route.params.id,
    content:JSON.stringify({
      pageStyle: pStore.pageConfig,
      contentList: pStore.list
    })
  })
}
</script>

<template>
  <div class="header_container">
<!--  <div class="left">-->
<!--    <div @click="toggleDark()">{{!isDark?'暗色模式':'亮色模式'}}</div>-->
<!--    <el-button link type="primary" @click="router.back()">-->
<!--      返回-->
<!--    </el-button>-->
<!--  </div>-->
    <div class="tools">
      <div v-for="tool in tools" :key="tool.title" class="tool" @click="tool.onClick">
      <el-icon>
        <component :is="tool.icon" />
      </el-icon>
        <span>{{tool.title}}</span>
      </div>
    </div>
    <div class="right">
      <el-button @click="submit">
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
  .right{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    padding-right: 10px;
  }
  .tools{
    display: flex;
    align-items: center;
    flex: 1;
    width: 100%;
    justify-content: center;
    padding-right: 280px;
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
