<script setup>

 
import SettingLayout from "ve/components/SettingLayout.vue";
import {defineEmits} from "vue";

defineOptions({
  name: 'Button',
  label: '按钮',
  type: 'BasePackages',
  order: 1
})

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
})
const emit = defineEmits(['update:modelValue']);
const data = computed({
  get() {
    const {attrs={},events={},styles={},...arg} = props.modelValue||{}
    return {
      attrs,
      events,
      styles,
      ...arg
    }
  },
  set(value) {
    emit('update:modeValue', value)
  }
})
// const {attrs, styles, events} = useSettingPros()

const typeObj = {
  default: '默认按钮',
  primary: '主要按钮',
  success: '成功按钮',
  warning: '警告按钮',
  danger: '危险按钮',
  info: '信息按钮',
  text: '文本按钮',
}
const sizeObj = {
  default: '默认尺寸',
  small: '小尺寸',
  large: '大尺寸',
}
const clickTypeObj={
  request: '发送请求',
  alert: '弹窗',
  router: '路由',
  link: '跳转',
}

</script>

<template>

  <SettingLayout>
    <template #attrs>
      <el-form label-width="100px">
        <el-form-item label="按钮名称">
          <el-input v-model="data.attrs.text" placeholder="请输入按钮名称"></el-input>
        </el-form-item>

        <el-form-item label="按钮尺寸">
          <el-select v-model="data.attrs.size" placeholder="请选择">
            <el-option v-for="(label,key) in sizeObj" :key="key" :label="label" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="按钮类型">
          <el-select v-model="data.attrs.type" placeholder="请选择" @change="data.attrs.color = ''">
            <el-option v-for="(label,key) in typeObj" :key="key" :label="label" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="按钮颜色">
          <el-color-picker v-model="data.attrs.color" @change="data.attrs.type = ''"></el-color-picker>
        </el-form-item>
        <el-form-item label="按钮形状">
          <el-switch v-model="data.attrs.round" active-color="#1890ff" inactive-color="#dcdfe6"></el-switch>
        </el-form-item>
        <!-- 朴素按钮-->
        <el-form-item label="是否朴素">
          <el-switch v-model="data.attrs.plain" active-color="#1890ff" inactive-color="#dcdfe6"></el-switch>
        </el-form-item>
        <!-- 细边框-->
        <el-form-item label="是否细边框">
          <el-switch v-model="data.attrs.hairline" active-color="#1890ff" inactive-color="#dcdfe6"></el-switch>
        </el-form-item>
        <!-- 跳转链接-->
        <el-form-item label="跳转链接">
          <el-input v-model="data.attrs.url"></el-input>
        </el-form-item>
      </el-form>
    </template>

    <template #styles>
      <el-form label-width="100px">
        <!--        定位方式-->
        <el-form-item label="定位方式">
          <el-radio-group v-model="data.styles.position">
            <el-radio label="relative">相对定位</el-radio>
            <el-radio label="absolute">绝对定位</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--        //如果是绝对定位 则出现上边距 右边距输入-->
        <el-form-item label="边距" v-if="data.styles.position === 'absolute'">
          <div>
            <!--           选择是上边距还是下边距-->
            <el-switch v-model="data.styles.isTop" active-color="#1890ff" inactive-color="#dcdfe6">是否上边距
            </el-switch>
            <div>
              <el-input v-if="data.styles.isTop" v-model="data.styles.top" placeholder="上边距"></el-input>
              <el-input v-else v-model="data.styles.bottom" placeholder="下边距"></el-input>
            </div>
          </div>
          <el-input v-model="data.styles.right" label="右边距"></el-input>
        </el-form-item>
        <!--         对齐方式-->
        <el-form-item label="对齐方式">
          <el-radio-group v-model="data.styles.margin">
            <el-radio label="0 0 auto">左对齐</el-radio>
            <el-radio label="center">居中</el-radio>
            <el-radio label="right">右对齐</el-radio>
          </el-radio-group>

        </el-form-item>
        <!--          字体大小-->
        <el-form-item label="字体大小">
          <el-input v-model="data.styles.fontSize" label="字体大小"></el-input>
        </el-form-item>

        <!--        内边距-->
        <el-form-item label="内边距">
          <el-input v-model="data.styles.padding" label="内边距"></el-input>
        </el-form-item>
      </el-form>
    </template>

    <template #events>
      <el-form label-width="100px">
        <el-form-item label="点击事件">
<!--      选择  发送请求 弹窗-->
          <el-select v-model="data.events.clickType" placeholder="请选择">
            <el-option v-for="(label,key) in clickTypeObj" :key="key" :label="label" :value="key"></el-option>
          </el-select>

        </el-form-item>
      </el-form>
    </template>
  </SettingLayout>

</template>

<style scoped lang="scss">

</style>
