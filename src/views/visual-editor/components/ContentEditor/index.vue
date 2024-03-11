<script setup>
import draggable from 'vuedraggable';
import {components} from 've/components/Packages'
import useModel from "ve/hooks/useModel.js"

console.log(components, 'components')
const pStore = useCustomPage();
const list = useModel(() => pStore.list, (newValue) => pStore.updateList(JSON.parse(JSON.stringify(newValue))))
import useCurrent from '../../hooks/useCurrent.js';

const {currentUid, setCurrentUid} = useCurrent()
import styleFmt from "utils/styleFmt.js";

const scrollTop = ref(0)
const scrollFun = e=>{
  console.log(e, 'scrollFun')
  scrollTop.value = e.scrollTop
}


</script>


<template>
  <el-scrollbar class="content_editor"  ref="contentEditor">
    <el-scrollbar height="667" class="phone_container"  @scroll="scrollFun">
      <DraggableGroup   :scrollTop="scrollTop" :style="styleFmt(pStore.pageConfig?.styles,{})" style="min-height: 667px" v-model="list"  v-bind="pStore.pageConfig.attrs"></DraggableGroup>
    </el-scrollbar>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.content_editor {
  height: calc(100vh - var(--header-height));
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw - var(--aside-width) - 600px);

  //padding-right: 600px;

}

.phone_container {
  transform: scale(1);
  width: 375px;
  height: 667px;
  background: #fff;
  //border-radius: 10px;
  border: 2px solid rgba(87, 86, 86, 0.32);
  box-sizing: content-box;
  overflow-x: hidden;
  position: relative;
  transition: all .3s;
  margin: 20px 0;
  border-radius: 5px;


}
</style>
