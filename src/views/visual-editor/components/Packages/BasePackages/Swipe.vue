<script>
export default {
  name: "Swipe"
}
</script>

<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item>
      <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"></van-image>
    </van-swipe-item>
    <van-swipe-item>
      <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"></van-image>
    </van-swipe-item>
    <van-swipe-item>
      <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"></van-image>
    </van-swipe-item>

  </van-swipe>
</template>

<style scoped lang="scss">
.my-swipe{
  width: 100%;
}
</style>
