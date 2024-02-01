
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

      }
    }
  }
})
const emit = defineEmits([])
const clickFun = (e) => {
  //console.log(props.events.onClick,'events')
      // eval(props.events.onClick)
}
</script>
<template>
  <van-button v-bind="props" @click="clickFun">{{ props.text }}</van-button>
</template>

<style scoped lang="scss">

</style>
