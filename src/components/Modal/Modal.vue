<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid'
// const emit = defineEmits(['close-modal'])
</script>
<template>
  <div @click="$emit('close-modal')" class="modal">
    <div @click.stop class="modal-body">
      <div class="flex items-center justify-between">
        <h3></h3>
        <XMarkIcon
          @click="$emit('close-modal')"
          class="close h-4 w-4 hover:text-red-500 transition duration-300 cursor-pointer"
        />
      </div>
      <div class="flex flex-col gap-3">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.modal-body {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px 20px;
  background-color: white;
  min-width: 300px;
  border-radius: 10px;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>