<script setup>
import { PlusIcon } from '@heroicons/vue/24/solid'
const emit = defineEmits(['open-modal'])
</script>
<template>
  <button
    @click="$emit('open-modal')"
    class="i bg-green-500 rounded-full p-1 hover:bg-green-800 transition duration-400"
  >
    <PlusIcon class="w-5 h-5 cursor-pointer text-white" />
  </button>
</template>