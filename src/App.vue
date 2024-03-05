<script setup>
import {Connection} from "@element-plus/icons-vue";

const aStore = useApp()
const router = useRouter();
const route = useRoute();
watch(() => route.path, () => {
  const {name, path} = route;
  let list = []
  switch (name) {
    case 'page-manager':
      list = [
        {
          title: '页面管理',
          path: '/'
        }
      ]
      break;
    case 'visual-editor':
      list = [
        {
          title: '页面管理',
          path: '/'
        },
        {
          title: '可视化编辑',
          path: path
        }
      ]
      break;
    default:
      list = [
        {
          title: '页面管理',
          path: '/'
        }
      ]
  }

  aStore.updateBreadcrumb(list.filter(item => item.path))
}, {
  immediate: true
})
const iframeLink = ref('')
onMounted(() => {
  if(window.self!=window.top){
      // alert('iframe中打开')
    // 在当前链接后拼接token以及name参数
    iframeLink.value = location.href

  }
})
</script>

<template>
  <router-view v-slot="{ Component,route }">
    <keep-alive>
      <component :is="Component" :key="route.path" v-if="route.meta.keepAlive"/>
    </keep-alive>
    <component v-if="!route.meta.keepAlive" :is="Component" :key="route.path"/>
  </router-view>

  <a class="iframe_link" v-if="iframeLink" :href="iframeLink" target="_blank">
    <Connection class="icon"></Connection>
  </a>
</template>

<style scoped lang="scss">
.iframe_link{
  position: fixed;
  right: 0;
  bottom: 40%;
  cursor: pointer;
  padding: 10px;
  .icon{
    width: 30px;
    height: 30px;
  }
}
</style>
