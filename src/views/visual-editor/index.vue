<script setup>
import {getThemeEditorDetailContent} from "api";

 const cStore = useCustomPage()
const route = useRoute()
onMounted(async () => {
  const {query:{id},params:{url}  } = route
 const {content} = await  getThemeEditorDetailContent({
    url,
    id
  })

  console.log(content,'content')
  const {pageConfig={},contentList=[]} = content||{}
  cStore.updatePageConfig(pageConfig)
  cStore.updateList(contentList)
})
</script>

<template>
  <Layout>
    <template v-slot:main>
      <ContentEditor></ContentEditor>
    </template>
    <template v-slot:attrs>
      <AttrsEditor></AttrsEditor>
    </template>
  </Layout>
</template>

<style scoped lang="scss">


</style>
