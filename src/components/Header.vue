<script setup>
import { TrashIcon, CheckCircleIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits(["openEnd-modal", "openDel-modal"]);

const openEndModal = () => emit("openEnd-modal");
const openDelModal = () => emit("openDel-modal");
</script>

<template>
  <header
    class="flex fixed w-full justify-between items-center px-6 py-1 bg-gradient-to-r from-amber-300 to-amber-200 shadow-md rounded-b-md"
  >
    <!-- Логотип / название -->
    <a
      href="#"
      class="text-xl font-semibold text-white hover:text-gray-900 transition-colors"
    >
      ToDo
    </a>

    <!-- Кнопки модалок -->
    <div class="flex gap-3 items-center">
      <!-- Завершённые задачи -->
      <button
        @click="openEndModal"
        class="p-2 rounded-full hover:bg-blue-100 transition-colors"
        title="Завершённые задачи"
      >
        <CheckCircleIcon
          class="w-6 h-6 text-blue-500 hover:text-blue-600 transition-colors"
        />
      </button>

      <!-- Корзина -->
      <button
        @click="openDelModal"
        class="p-2 rounded-full hover:bg-red-100 transition-colors"
        title="Корзина"
      >
        <TrashIcon
          class="w-6 h-6 text-red-500 hover:text-red-600 transition-colors"
        />
      </button>
    </div>
  </header>
</template>
