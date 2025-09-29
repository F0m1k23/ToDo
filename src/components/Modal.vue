<script setup>
const emit = defineEmits(["close-modal"]);
const close = () => emit("close-modal");
</script>

<template>
  <div
    @click="close"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black/30"
  >
    <div
      @click.stop
      class="max-w-md w-full mx-4 bg-white rounded-xl shadow-2xl p-5 transform transition-transform duration-300 scale-100"
    >
      <ul class="flex flex-col gap-2">
        <slot name="content"></slot>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Полупрозрачный фон уже задан через bg-black/30 */
</style>
