<script setup>
const props = defineProps({
  src: {
    type: String,
    default: 'https://img01.yzcdn.cn/vant/cat.jpeg',
  },
  events: {
    type: Object,
    default: () => {
      return {
        onClick: () => {
          console.log('click')
        }
      }
    }
  }
})
</script>

<template>
  <van-image
      v-bind="props" v-on="props.events"
  />
</template>

<style scoped lang="scss">

</style>
