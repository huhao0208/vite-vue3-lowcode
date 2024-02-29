<script setup>
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
</script>

<template>
  <router-view v-slot="{ Component,route }">
    <keep-alive>
      <component :is="Component" :key="route.path" v-if="route.meta.keepAlive"/>
    </keep-alive>
    <component v-if="!route.meta.keepAlive" :is="Component" :key="route.path"/>
  </router-view>


</template>

<style scoped>

</style>
