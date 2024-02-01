<script setup>
import {defineEmits} from "vue";

defineOptions({
  name: 'Image',
  label: '图片',
  type: 'BasePackages',
  order: 2
})
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
})
const emit = defineEmits(['update:modelValue']);
const data = computed({
  get() {
    const {attrs={},events={},styles={},...arg} = props.modelValue||{}
    return {
      attrs,
      events,
      styles,
      ...arg
    }
  },
  set(value) {
    emit('update:modeValue', value)
  }
})
</script>

<template>
<SettingLayout>
  <template #attrs>

    1111
  </template>
</SettingLayout>
</template>

<style scoped lang="scss">

</style>
