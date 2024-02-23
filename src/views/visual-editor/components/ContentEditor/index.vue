<script setup>
import draggable from 'vuedraggable';
import {components} from 've/components/Packages'
import useModel from "ve/hooks/useModel.js"

console.log(components, 'components')
const pStore = useCustomPage();
const list = useModel(() => pStore.list, (newValue) => pStore.updateList(JSON.parse(JSON.stringify(newValue))))
import useCurrent from '../../hooks/useCurrent.js';

const {currentUid, setCurrentUid} = useCurrent()




const pageStyles = toRef(pStore.pageConfig)

import styleFmt from "utils/styleFmt.js";

</script>


<template>
  <div class="content_editor" ref="contentEditor">
    <el-scrollbar height="667" class="phone_container" :style="{
    ...pageStyles,
    backgroundImage:`url(${pageStyles.backgroundImage})`,

  }">
      <DraggableGroup style="min-height: 667px" v-model="list"></DraggableGroup>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.content_editor {

}

.phone_container {
  transform: scale(1);
  width: 375px;
  min-height: 667px;
  background: #fff;
  //border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  overflow-x: hidden;

  position: relative;
  transition: all .3s;

}
</style>
