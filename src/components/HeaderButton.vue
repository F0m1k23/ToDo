<script setup>
import { PlusIcon } from '@heroicons/vue/24/solid'
const emit = defineEmits(['open-modal'])
</script>
<template>
  <button
    @click="$emit('open-modal')"
    class="bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition duration-300 flex items-center justify-center"
  >
    <PlusIcon class="w-5 h-5 cursor-pointer text-white" />
  </button>
</template>