<script setup>
const pStore = useCustomPage();
import {settingComponents} from 've/components/Packages'
import useModel from "ve/hooks/useModel.js"
const detail = useModel(()=>pStore.currentDetail,val=>pStore.updateCurrentDetail(val))
</script>

<template>
 <div>


   <component v-model="detail"  v-if="detail?.name"  :key="detail.uid" :is="settingComponents[detail.name]"></component>

   <SettingLayout v-else></SettingLayout>
 </div>
</template>

<style scoped lang="scss">

</style>
