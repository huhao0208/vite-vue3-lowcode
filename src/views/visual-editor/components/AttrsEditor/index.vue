<script setup>
import {values} from "vuedraggable/dist/vuedraggable.common.js";

const pStore = useCustomPage();
// import useCurrent from "ve/hooks/useCurrent.js";
import {settingComponents} from 've/components/Packages'
import useModel from "ve/hooks/useModel.js"

console.log(settingComponents, 'settingComponents')

const detail = useModel(() => pStore.currentDetail, values => {
  pStore.updateCurrentDetail(val)
})

console.log(detail, 'detaildetaildetail')
</script>

<template>
  <!--{{detail}}-->
  <component v-model:attrs="detail.value.attrs" v-model:styles="detail.value.styles" v-if="detail.value?.name" :is="settingComponents[detail.value.name]?.component
"></component>
</template>

<style scoped lang="scss">

</style>
