<!-- ContextMenu.vue -->
<template>
  <transition name="fade">

    <div v-if="visible">
      <ul class="context-menu" :style="{ left: position.x + 'px', top: position.y + 'px' }">
        <li class="context-menu-item" v-for="(item, index) in menuItems" :key="index" @click="handleItemClick(item)" :disabled="item.disabled">
          {{ item.label }}
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    el: {type: Object, required: true},
    visible: {type: Boolean, required: true},
    position: {type: Object, required: true},
    menuItems: {type: Array, required: true},
    onClose: {type: Function, required: true}
  },

  methods: {
    handleItemClick(item) {
      item.onClick?.(this.el);
      this.$emit('close');
      this.onClose();
    },
  },
};
</script>

<style scoped lang="scss">
.context-menu {
  position: fixed;
  background: #fff;
  border-radius: 5px;
  .context-menu-item {
    padding: 8px 16px;
    width: 80px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-bottom: 1px solid #ddd;
    &:hover {
      background: #eee;
    }
    &[disabled=true] {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    }
  }
}


</style>
