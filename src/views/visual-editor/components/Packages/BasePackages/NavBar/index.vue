<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  placeholder: {
    type: Boolean,
    default: false
  },
  fixed: {
    type: Boolean,
    default: false
  },
  leftText: {
    type: String,
    default: ''
  },
  rightText: {
    type: String,
    default: ''
  },
  leftIcon: {
    type: String,
    default: ''
  }
})
const onClickLeft = () => {
  console.log('返回')
}
const onClickRight = () => {
  console.log('搜索')
}
</script>

<template>
  <van-nav-bar
      :title="title"
      :placeholder="placeholder"
      :fixed="fixed"
      :left-text="leftText"
      :right-text="rightText"
      :left-icon="leftIcon"
      @click-left="onClickLeft"
      @click-right="onClickRight"
  />

</template>

<style scoped lang="scss">

</style>
