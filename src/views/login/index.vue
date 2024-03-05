<script setup>
const  appStore = useApp()
onMounted(() => {
  // 清除缓存
  appStore.setToken('')
  appStore.setUserName('')
  appStore.setUserInfo('')
 if (window.self!==window.top){
   // 通知父页面传递登录信息
   window.top.postMessage('login', '*');
   window.addEventListener('message', function (event) {
     console.log(event.data,'父页面传递的数据')
     const { token, name, userInfo } = event.data
     appStore.setToken(token)
     appStore.setUserName(name)
     appStore.setUserInfo(userInfo)
     location.replace('/')
   }, false)
 }else{
   console.log('未登录')
 }
})
</script>

<template>

  <div class="login">
    登录信息过期，请前往a端重新打开页面
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
