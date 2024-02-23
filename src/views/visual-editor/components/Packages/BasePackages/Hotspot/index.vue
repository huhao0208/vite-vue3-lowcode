<script setup>
import {defineEmits} from "vue";

const props = defineProps({
  uid: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Object,
    default: () => {},
  },
})
const emit = defineEmits(['update:modelValue']);
import useCurrentDetail from "ve/hooks/useCurrent.js"
const { currentDetail, updateCurrentDetail,currentUid,setCurrentUid} = useCurrentDetail()
import Vue3DraggableResizable from 'vue3-draggable-resizable'
//需引入默认样式
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
const active = ref(true)
import useModel from 've/hooks/useModel.js'

const styles = useModel(()=>props.modelValue||{},e=>emit('update:modelValue',e))

function print(val) {
  console.log(val)
}
</script>

<template>
  <div @click="setCurrentUid(props.uid)">
    <Vue3DraggableResizable
        :initW="styles.width"
        :initH="styles.height"
        v-model:x="styles.left"
        v-model:y="styles.top"
        v-model:w="styles.width"
        v-model:h="styles.height"
        :active="currentUid===uid"
        :draggable="true"
        :resizable="true"
        @activated="print('activated')"
        @deactivated="print('deactivated')"
        @drag-start="print('drag-start')"
        @resize-start="print('resize-start')"
        @dragging="print('dragging')"
        @resizing="print('resizing')"
        @drag-end="print('drag-end')"
        @resize-end="print('resize-end')"
    >
      热区
    </Vue3DraggableResizable>
  </div>
</template>

<style scoped lang="scss">

</style>
