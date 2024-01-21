<script setup>
import draggable from 'vuedraggable';
import {useCustomPage} from '@/store/customPage'

const pageStore = useCustomPage();
const list = pageStore.list

console.log(pageStore.list,'list')
const updateListFun = e=>{
  console.log(e)
pageStore.updateList(e)
}

// const listFmt = function (){
//   list.value.forEach((element, index) => {
//     if (!element.uid) {
//       list.value[index].uid =  +new Date()
//     }
//   });
// }
function change (e) {
 // console.log(e,JSON.parse(JSON.stringify(list.value)))
  // listFmt(list)
}



</script>

<template>
  <el-scrollbar height="667" class="phone_container">
    {{list}}
    <draggable group="page" :modelValue="list" @update:modelValue="e=>updateListFun(e)" item-key="uid" style="min-height: 667px" @change="change">
      <template #item="{ element }" >
        <div class="list-group-item" >

        <component :is="element.component" :key="element.uid" ></component>
        </div>
      </template>
    </draggable>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.phone_container{

  transform: scale(1);
  width: 375px;
  min-height: 667px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,.1);
  overflow-x: hidden;

  position: relative;
  transition: all .3s;

}

</style>
