<script setup>
const  appStore = useApp()
onMounted(() => {
  // 清除缓存
  appStore.setToken('')
  appStore.setUserName('')
  appStore.setUserInfo('')
})
</script>

<template>

  <div class="login">
    登录过期了，请重新登录
  </div>


</template>

<style scoped lang="scss">
.login{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
