<script setup>
import { CheckIcon, TrashIcon, ArrowPathIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  task: { type: Object },
  isTrash: { type: Boolean, default: false },
  Done: { type: Boolean, default: true },
});

const emit = defineEmits(["delete-task", "is-done", "resort-task"]);

const delTask = () => emit("delete-task");
const isDone = () => emit("is-done");
const resort = () => emit("resort-task");
</script>

<template>
  <li
    class="flex items-center justify-between w-full max-w-md px-4 py-3 mb-2 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-200"
  >
    <!-- Основная информация -->
    <div>
      <p
        class="text-base"
        :class="{ 'line-through text-gray-400': task.isDone }"
      >
        {{ task.title }}
      </p>
      <span class="text-xs font-light text-gray-500">
        {{ new Date(task.date).toLocaleString() }}
      </span>
    </div>

    <!-- Кнопки действий -->
    <div class="flex gap-2 items-center">
      <!-- Завершить -->
      <button
        v-if="Done"
        @click="isDone"
        class="p-2 rounded-full hover:bg-blue-100 transition-colors"
        :title="task.isDone ? 'Вернуть в список' : 'Завершить задачу'"
      >
        <CheckIcon
          class="w-6 h-6 cursor-pointer transition-colors"
          :class="{
            'text-gray-400': task.isDone,
            'text-blue-500 hover:text-blue-600': !task.isDone,
          }"
        />
      </button>

      <!-- Удалить -->
      <button
        @click="delTask"
        class="p-2 rounded-full hover:bg-red-100 transition-colors"
        title="Удалить задачу"
      >
        <TrashIcon
          class="w-6 h-6 text-red-500 hover:text-red-600 cursor-pointer transition-colors"
        />
      </button>

      <!-- Восстановить (только для корзины) -->
      <button
        v-if="isTrash"
        @click="resort"
        class="p-2 rounded-full hover:bg-green-100 transition-colors"
        title="Восстановить задачу"
      >
        <ArrowPathIcon
          class="w-6 h-6 text-green-500 hover:text-green-600 cursor-pointer transition-colors"
        />
      </button>
    </div>
  </li>
</template>

<style scoped>
li {
  background: #fff;
}
</style>
