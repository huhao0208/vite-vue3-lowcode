
<script setup>
const props = defineProps({
  text: {
    type: String,
    default: '按钮',
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
  <van-button v-bind="props" v-on="props.events">{{ props.text }}</van-button>
</template>

<style scoped lang="scss">

</style>
