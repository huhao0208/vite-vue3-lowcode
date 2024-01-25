<script setup>
defineProps({
  title: {
    type: String,
    default: '标题'
  },
  placeholder: {
    type: Boolean,
    default: true
  },
  fixed: {
    type: Boolean,
    default: true
  },
  leftText: {
    type: String,
    default: '返回'
  },
  rightText: {
    type: String,
    default: '搜索'
  },
  leftIcon: {
    type: String,
    default: 'arrow-left'
  }
})

</script>

<template>
  <div>
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
  </div>

</template>

<style scoped lang="scss">

</style>
