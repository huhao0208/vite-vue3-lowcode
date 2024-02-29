<script setup>
const pStore = useCustomPage();
import useModel from "ve/hooks/useModel.js";

const detail = useModel(() => pStore.currentDetail, val => pStore.updateCurrentDetail(val));

const paddingChange = changeType => {
  if (changeType === 'item') {
    detail.value.outStyles.padding = null
  } else {
    // detail.value.outStyles= {
    //   ...detail.value.outStyles,
    //   paddingTop:null,
    //   paddingLeft:null,
    //   paddingRight:null,
    //   paddingBottom:null
    // }
  }
  console.log(detail,'detaildetaildetail')
}
</script>

<template>
  <el-form label-width="100px">
    <!--    元素类型 块元素 行内块元素 行内元素-->
    <!--    <el-form-item label="元素类型">-->
    <!--      <el-select v-model="detail.outStyles.display">-->
    <!--        <el-option label="块元素(独占一行)" value="block"/>-->
    <!--        <el-option label="行内块元素(不独占一行，宽度可自适应)" value="inline-block"/>-->
    <!--      </el-select>-->
    <!--    </el-form-item>-->
    <!--    纵向对齐方式-->
    <!--    <el-form-item label="纵向对齐方式" v-if="detail.outStyles.display==='inline-block'">-->
    <!--      <el-select v-model="detail.outStyles.verticalAlign" placeholder="请选择纵向对齐方式">-->
    <!--        <el-option label="顶部" value="top"/>-->
    <!--        <el-option label="居中" value="middle"/>-->
    <!--        <el-option label="底部" value="bottom"/>-->
    <!--      </el-select>-->
    <!--    </el-form-item>-->
    <!--    <el-form-item label="透明度">-->
    <!--      <el-slider v-model="detail.outStyles.opacity" :max="1" :step="0.01"/>-->
    <!--    </el-form-item>-->
    <el-form-item label="宽度">
      <div class="row">
        <el-slider v-model="detail.outStyles.width" :max="375" :step="1"/>
        <el-input v-model="detail.outStyles.width" class="row_value"/>
      </div>
    </el-form-item>
    <el-form-item label="高度">
      <div class="row">
        <el-slider v-model="detail.outStyles.height" :max="800" :step="1"/>
        <el-input v-model="detail.outStyles.height" class="row_value"/>
      </div>
    </el-form-item>


    <el-form-item label="边距">
      <div class="padding_setting">
        <div class="top">
          <el-input-number v-model="detail.outStyles.paddingTop" @change="paddingChange('item')"
                           controls-position="right"></el-input-number>
        </div>
        <div class="left">
          <el-input-number v-model="detail.outStyles.paddingLeft" @change="paddingChange('item')"
                           controls-position="right"></el-input-number>
        </div>
        <div class="right">
          <el-input-number v-model="detail.outStyles.paddingRight" @change="paddingChange('item')"
                           controls-position="right"></el-input-number>
        </div>
        <div class="bottom">
          <el-input-number v-model="detail.outStyles.paddingBottom" @change="paddingChange('item')"
                           controls-position="right"></el-input-number>
        </div>
        <div class="center">
          <el-input-number v-model="detail.outStyles.padding" @change="paddingChange()"
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
  margin-left: 50px;

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
