<script setup>
import {values} from "vuedraggable/dist/vuedraggable.common.js";

const pStore = useCustomPage();
// import useCurrent from "ve/hooks/useCurrent.js";
import {settingComponents} from 've/components/Packages'
import useModel from "ve/hooks/useModel.js"

 const detail = useModel(()=>pStore.currentDetail,val=>pStore.updateCurrentDetail(val))



</script>

<template>
  <component v-model="detail"  v-if="detail?.name" :is="settingComponents[detail.name]?.component
"></component>
</template>

<style scoped lang="scss">

</style>
