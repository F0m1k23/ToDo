<script setup>
import { TrashIcon } from '@heroicons/vue/24/solid'
const props = defineProps({
  task: {
    type: Object,
  },
})
</script>
<template>
  <li
    :class="[
      'border-1 rounded-lg py-3 px-3',
      {
        'text-gray-400': props.task.isDone,
      },
    ]"
  >
    <div class="flex items-center gap-5">
      <div class="bg-red-100 p-2 rounded-full self-start">
        {{ props.task.topic }}
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-bold">{{ props.task.title }}</h3>
        <p>{{ props.task.description }}</p>
      </div>
      <div class="flex flex-col gap-4">
        <input
          :checked="props.task.isDone"
          class="cursor-pointer"
          @click="$emit('is-done')"
          type="checkbox"
          name=""
          id=""
        />
        <TrashIcon
          @click="$emit('remove-task')"
          class="w-5 h-5 hover:text-red-500 transition duration-300 cursor-pointer"
        />
      </div>
    </div>
  </li>
</template>