<script setup>
import { ref, reactive } from "vue";
const props = defineProps({
  link: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["click-active"]);
const click = () => {
  emit("click-active");
};
</script>
<template>
  <li
    :class="{
      'bg-amber-600': link.isActive,
      'hover:bg-amber-500': !link.isActive,
    }"
    @click="click"
    class="bg-amber-400 min-w-20 text-center hover:bg-amber-500 text-white rounded-xl py-1 px-2 cursor-pointer transition duration-400"
  >
    {{ link.name }}
  </li>
</template>