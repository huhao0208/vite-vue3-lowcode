<script setup>
const pStore = useCustomPage();
import {settingComponents} from 've/components/Packages'
import useModel from "ve/hooks/useModel.js"
const detail = useModel(()=>pStore.currentDetail,val=>pStore.updateCurrentDetail(val))
</script>

<template>
  <component v-model="detail"  v-if="detail?.name"  :key="detail.uid" :is="settingComponents[detail.name]
"></component>
</template>

<style scoped lang="scss">

</style>
