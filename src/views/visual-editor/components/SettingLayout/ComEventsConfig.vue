<script setup>
import draggable from 'vuedraggable';
import {ArrowDown, Delete, Sort} from "@element-plus/icons-vue";
import {defineEmits} from "vue";
import useModel from 've/hooks/useModel.js'
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
    }
  }
})
const pStore = useCustomPage();
const data = useModel(() => pStore.currentDetail, val => pStore.updateCurrentDetail(val));




const clickTypes = [
  {
    type: 'request',
    title: '发送请求',
    disabled: true
  },

  {
    type: 'alert',
    "title": "弹窗",
    "disabled": false
  },
  {
    type: 'router',
    "title": "路由",
    "disabled": true
  },
  {
    type: 'link',
    "title": "跳转",
    "disabled": false
  }
]

const addEventFun = e=>{
  console.log(e)
  data.value.events.push({
    clickType: e,
    id: uuid()
  })
}
</script>

<template>
  <div v-if="data.events?.length===0" class="events_empty">
    请添加事件，请注意先后执行顺序！
  </div>
  <el-form label-width="120px" v-else>
    <draggable v-model="data.events" class="group_list" item-key="clickType" handle=".move">>
      <template #item="{element,index}">
        <div class="event_card">

          <div class="left">
            {{ index + 1 }}
          </div>
          <div class="center">
            <EventItemConf v-model="data.events[index]"/>

          </div>
          <div class="right">
            <span @click="data.events.splice(index,1)">
               <Delete style="width: 1.2em; height: 1.2em;"/>
            </span>
            <span class="move">
               <Sort style="width: 1.2em; height: 1.2em;"/>
            </span>
          </div>
        </div>
      </template>
    </draggable>


  </el-form>
  <div style="text-align:right">
    <el-dropdown @command="addEventFun" trigger="click">
      <el-button class="el-dropdown-link" type="primary"  >
        添加事件<el-icon class="el-icon--right"><ArrowDown/></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item  v-for="item in clickTypes" :key="item.type" :command="item.type" :disabled="item.disabled" >{{item.title}}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">

</style>
