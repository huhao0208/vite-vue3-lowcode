<script setup>
const pStore = useCustomPage();
import useModel from "ve/hooks/useModel.js";
const detail = useModel(() => pStore.currentDetail, val => pStore.updateCurrentDetail(val));


const padding = computed({
  get: function (){
    const {paddingTop=null, paddingLeft=null, paddingRight=null, paddingBottom=null} = detail.value.outStyles
    return [paddingTop,paddingLeft, paddingRight].some(item => item!==paddingBottom)?null:paddingBottom
  },
  set: function (val='') {
    detail.value.outStyles = {
      ...detail.value.outStyles,
      paddingTop: val,
      paddingLeft: val,
      paddingRight: val,
      paddingBottom: val
    }
  }
})

import animationList from "./animateConfig.js";

const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})


</script>

<template>
  <el-form label-width="100px">
    <!--加载动画-->

    <el-form-item label="加载动画" v-if="config.animate">

      <el-tree-select
          v-model="detail.attrs.class"
          :data="animationList"
          :render-after-expand="false"
          placeholder="请选择加载动画"
          style="width: 240px"
      />
    </el-form-item>

    <el-form-item label="宽度" v-if="config.width">
      <div class="row">
        <el-slider v-model="detail.outStyles.width" :max="375" :step="1"/>
        <el-input v-model="detail.outStyles.width" class="row_value"/>
      </div>
    </el-form-item>
    <el-form-item label="对齐方式" v-if="config.aline">
       <el-select v-model="detail.outStyles.margin" placeholder="请选择左右对齐方式">
         <el-option label="左" value="0 auto 0 0"/>
         <el-option label="中" value="0 auto"/>
         <el-option label="右" value="0 0 0 auto"/>


       </el-select>
    </el-form-item>
    <el-form-item label="高度" v-if="config.height">
      <div class="row">
        <el-slider v-model="detail.outStyles.height" :max="800" :step="1"/>
        <el-input v-model="detail.outStyles.height" class="row_value"/>
      </div>
    </el-form-item>



    <el-form-item label="边距" v-if="config.padding">
      <div class="padding_setting">
        <div class="top">
          <el-input-number placeholder="上" v-model="detail.outStyles.paddingTop"
                           controls-position="right"></el-input-number>
        </div>
        <div class="left">
          <el-input-number placeholder="左" v-model="detail.outStyles.paddingLeft"
                           controls-position="right"></el-input-number>
        </div>
        <div class="right">
          <el-input-number placeholder="右" v-model="detail.outStyles.paddingRight"
                           controls-position="right"></el-input-number>
        </div>
        <div class="bottom">
          <el-input-number placeholder="下" v-model="detail.outStyles.paddingBottom"
                           controls-position="right"></el-input-number>
        </div>
        <div class="center">
          <el-input-number placeholder="" v-model="padding"
                           controls-position="right"></el-input-number>
        </div>
      </div>
    </el-form-item>

  </el-form>
</template>

<style scoped lang="scss">
.row {
  width: 100%;
  display: flex;
  align-items: center;

  .row_value {
    margin-left: 30px;
    width: 90px;
  }
}

.padding_setting {
  position: relative;
  width: 300px;
  height: 150px;
  //margin-left: 50px;

  & > div {
    width: 100px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;

    :deep(.el-input-number) {
      width: 80px;
    }
  }

  .top {
    top: 0;
    left: 100px;
  }

  .bottom {
    bottom: 0;
    left: 100px;
  }

  .left {
    top: 50px;
    left: 0;
  }

  .right {
    right: 0;
    top: 50px;
  }

  .center {
    top: 50px;
    left: 100px;
  }
}
</style>
