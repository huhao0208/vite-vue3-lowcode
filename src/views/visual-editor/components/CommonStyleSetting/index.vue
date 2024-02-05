<script setup>
const pStore = useCustomPage();
import useModel from "ve/hooks/useModel.js";

const detail = useModel(() => pStore.currentDetail, val => pStore.updateCurrentDetail(val));
</script>

<template>
  <el-form label-width="100px">
    <!--    元素类型 块元素 行内块元素 行内元素-->
    <el-form-item label="元素类型">
      <el-select v-model="detail.outStyles.display">
        <el-option label="块元素(独占一行)" value="block"/>
        <el-option label="行内块元素(不独占一行，宽度可自适应)" value="inline-block"/>
      </el-select>
    </el-form-item>
    <!--    纵向对齐方式-->
    <el-form-item label="纵向对齐方式" v-if="detail.outStyles.display==='inline-block'">
      <el-select v-model="detail.outStyles.verticalAlign" placeholder="请选择纵向对齐方式">
        <el-option label="顶部" value="top"/>
        <el-option label="居中" value="middle"/>
        <el-option label="底部" value="bottom"/>
      </el-select>
    </el-form-item>
    <el-form-item label="透明度">
      <el-slider v-model="detail.outStyles.opacity" :max="1" :step="0.01"/>
    </el-form-item>
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

    <div>
      <el-row>
        <el-col :span="8"></el-col>
        <el-col :span="8">
          <el-form-item label="上边距">
            <el-input v-model="detail.outStyles.paddingTop"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="左边距">
            <el-input v-model="detail.outStyles.paddingLeft"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-input v-model="detail.outStyles.padding"></el-input>
        </el-col>
        <el-col :span="8">
          <el-form-item label="右边距">
            <el-input v-model="detail.outStyles.paddingRight"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">

        </el-col>
        <el-col :span="8">

          <el-form-item label="下边距">
            <el-input v-model="detail.outStyles.paddingBottom"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">

        </el-col>
      </el-row>
    </div>
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
</style>
