<script setup>
import {defineEmits} from "vue";
import useModel from "ve/hooks/useModel.js";

defineOptions({
  name: 'NoticeBar',
  label: '通知组件',
  type: 'BasePackages',
  _hidden: false,
  order: 4,
  config: {
    attrs: {
      text: '无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。',
      leftIcon: 'volume-o',
      scrollable: true,
      speed: 60,
      delay: 1,
      background: '#ffffff',
      color: '#333333',
    },
    styles: {
      // height:''
      display: '',

    },
    outStyles: {
      height: 40
    },
    events: []
  }
})
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
    }
  }
})
const emit = defineEmits(['update:modelValue']);
const data = useModel(() => props.modelValue, e => emit('update:modelValue', e))
const iconList = [
  {
    value: 'volume-o',
    label: '通知'
  },
  {
    value: 'question-o',
    label: '帮助'
  },
  {
    value: 'fire-o',
    label: '热门'
  },
  {
    value: 'gift-o',
    label: '礼物'
  }, {
    value: 'phone-o',
    label: '电话'
  },{
    value: 'warning-o',
    label: '警告'
  }
]
</script>

<template>
  <SettingLayout>
    <template #attrs>
      <el-form label-width="100px">
        <el-form-item label="文本内容">
          <el-input type="textarea" rows="5" v-model="data.attrs.text" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-select v-model="data.attrs.leftIcon" placeholder="请选择" clearable>
            <el-option
                v-for="item in iconList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否滚动播放">
          <el-switch v-model="data.attrs.scrollable" :active-value="true" :inactive-value="false"></el-switch>
        </el-form-item>
        <el-form-item label="播放速度">
          <el-input-number :min="1" :step="1" :max="200" v-model="data.attrs.speed"></el-input-number>
        </el-form-item>
        <el-form-item label="播放延迟">
          <el-input-number :min="0" :step="1" :max="100" v-model="data.attrs.delay"></el-input-number>
        </el-form-item>


        <el-form-item label="背景色">
          <el-color-picker v-model="data.styles.background" show-alpha></el-color-picker>
        </el-form-item>
        <el-form-item label="文字颜色">
          <el-color-picker v-model="data.attrs.color" show-alpha></el-color-picker>
        </el-form-item>
      </el-form>
    </template>
    <!--    <template #styles>-->
    <!--      <el-form label-width="100px">-->
    <!--        <el-form-item label="行高">-->
    <!--          <el-input-number :min="0.8" :step="0.1" :max="100"  v-model="data.styles.lineHeight"></el-input-number>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--    </template>-->
  </SettingLayout>
</template>

<style scoped lang="scss">

</style>
