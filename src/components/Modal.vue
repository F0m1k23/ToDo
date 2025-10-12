<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'
defineEmits(['close-modal'])
</script>
<template>
  <div @click="$emit('close-modal')" class="modal">
    <div @click.stop class="modal__block">
      <slot></slot>
      <button class="close__button" @click="$emit('close-modal')">
        <XMarkIcon class="close-icon" />
      </button>
    </div>
  </div>
</template>
<style scoped>
.close-icon {
  width: 24px;
  height: 24px;
  color: #3741d8;
  transition: all 0.3s ease;
}
.close-icon:hover {
  color: red;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.modal__block {
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 600px;
}
.close__button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
