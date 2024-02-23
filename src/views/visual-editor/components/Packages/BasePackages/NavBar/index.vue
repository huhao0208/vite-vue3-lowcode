<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  leftIcon: {
    type: String,
    default: ''
  }
})
const route = useRoute()
const onClickLeft = () => {
  if (window.history.length > 1) {
    route.goBack()
  } else {
    // 跳转指定链接
    location.replace('https://www.baidu.com')
  }

}
const onClickRight = () => {
  console.log('搜索')
}
</script>

<template>
  <div class="nav_bar"  >
    <div class="left" @click="onClickLeft">
      <van-icon name="arrow-left" />
    </div>
    <div class="title">
      {{ title }}
    </div>
  </div>

</template>

<style scoped lang="scss">
.nav_bar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;

  .left {
    position: absolute;
    left: 0;
    width: 50px;
    height: 100%;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .title {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
