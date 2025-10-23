<script setup>
import { ref, reactive } from 'vue'
import Modal from '@/components/Modal/Modal.vue'
import { useTasksStore } from '@/stores/tasks'
const store = useTasksStore()
import { useToast } from 'vue-toastification'
const isOpen = ref(false)
const mobileMenu = ref(false)
const toast = useToast()
const openModal = () => {
  isOpen.value = !isOpen.value
}
const task = reactive({
  title: '',
  description: '',
  isDone: false,
  topic: '🎯',
})

const validateTasksTitle = (title) => {
  if (title.length > 50) {
    toast.success('Заголовок не должен превышать 50 символов', {
      timeout: 3000,
      position: 'top-right',
    })
    return false
  }
}
const validateTasksDescription = (description) => {
  if (description.length > 250) {
    toast.success('Описание не должно превышать 250 символов', {
      timeout: 3000,
      position: 'top-right',
    })
    return
  }
}
const addTask = (task) => {
  store.addTask(task)
}
const addTopic = (item) => {
  Object.assign(task, {
    topic: item.icon,
  })
}
const openMenu = () => {
  mobileMenu.value = !mobileMenu.value
}
</script>
<template>
  <header class="py-4 px-6 bg-indigo-600 shadow-lg">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
          <span class="text-white">📝</span>
        </div>
        <h1 class="text-xl font-bold text-white">ToDo List</h1>
      </div>

      <nav class="hidden md:flex items-center gap-6">
        <router-link
          to="/"
          class="px-4 py-2 text-white/90 font-medium rounded-lg transition-colors hover:bg-white/10"
          active-class="text-white bg-white/20"
        >
          📋 Все
        </router-link>

        <router-link
          to="/notdone"
          class="px-4 py-2 text-white/90 font-medium rounded-lg transition-colors hover:bg-white/10"
          active-class="text-white bg-white/20"
        >
          ⏳ В процессе
        </router-link>

        <router-link
          :to="{ name: 'done' }"
          class="px-4 py-2 text-white/90 font-medium rounded-lg transition-colors hover:bg-white/10"
          active-class="text-white bg-white/20"
        >
          ✅ Выполненные
        </router-link>

        <button
          @click="openModal"
          class="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium transition-colors hover:bg-indigo-50"
        >
          <span>➕</span>
          Добавить
        </button>
      </nav>

      <button
        @click="openMenu"
        class="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
      >
        <div class="flex flex-col gap-1">
          <span class="w-6 h-0.5 bg-white rounded"></span>
          <span class="w-6 h-0.5 bg-white rounded"></span>
          <span class="w-6 h-0.5 bg-white rounded"></span>
        </div>
      </button>
    </div>
  </header>

  <Modal v-if="isOpen" @close-modal="isOpen = false">
    <div class="p-6 space-y-4">
      <h2 class="text-xl font-bold text-gray-800 text-center">Новая задача</h2>

      <div class="space-y-4">
        <div>
          <input
            @input="validateTasksTitle(task.title)"
            v-model="task.title"
            class="w-full border border-gray-300 py-2 px-3 rounded-lg focus:border-indigo-400 focus:outline-none"
            type="text"
            placeholder="Название задачи"
          />
        </div>

        <div>
          <textarea
            @input="validateTasksDescription(task.description)"
            v-model="task.description"
            class="w-full border border-gray-300 py-2 px-3 rounded-lg focus:border-indigo-400 focus:outline-none resize-none h-24"
            placeholder="Описание задачи"
          ></textarea>
        </div>

        <div>
          <p class="text-sm font-medium text-gray-700 mb-2">Тема:</p>
          <div class="flex gap-2">
            <button
              v-for="(item, index) in store.menuItems"
              :key="index"
              @click="addTopic(item)"
              class="w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-colors border"
              :class="{
                'border-indigo-400 bg-indigo-100': task.topic === item.icon,
                'border-gray-200 bg-gray-100 hover:bg-gray-200': task.topic !== item.icon,
              }"
            >
              {{ item.icon }}
            </button>
          </div>
        </div>
      </div>

      <button
        @click="addTask(task)"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium transition-colors hover:bg-indigo-700"
      >
        Добавить задачу
      </button>
    </div>
  </Modal>

  <div
    v-if="mobileMenu"
    class="md:hidden fixed inset-x-0 top-16 bg-white border-b border-gray-200 shadow-lg z-50"
  >
    <div class="p-4 space-y-2">
      <router-link
        class="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        to="/"
        @click="openMenu"
      >
        <span class="text-lg">📋</span>
        <span>Все задачи</span>
      </router-link>

      <router-link
        class="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        to="/notdone"
        @click="openMenu"
      >
        <span class="text-lg">⏳</span>
        <span>В процессе</span>
      </router-link>

      <router-link
        class="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        to="/done"
        @click="openMenu"
      >
        <span class="text-lg">✅</span>
        <span>Выполненные</span>
      </router-link>

      <button
        @click="openModal"
        class="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium transition-colors hover:bg-indigo-700 mt-2"
      >
        <span>➕</span>
        Новая задача
      </button>
    </div>
  </div>

  <div v-if="mobileMenu" @click="openMenu" class="md:hidden fixed inset-0 bg-black/30 z-40"></div>
</template>
<style scoped>
.mobile__btn {
  display: none;
  width: 30px;
  height: 30px;
}
.mobile__item {
  display: block;
  width: 100%;
  height: 4px;
  background-color: black;
  position: relative;
  border-radius: 5px;
}
.mobile__item::after,
.mobile__item::before {
  content: '';
  width: 100%;
  height: 4px;
  background-color: black;
  position: absolute;
  left: 0;
  border-radius: 5px;
  transition: all 0.3s ease;
}
.mobile__item::before {
  top: 7px;
}
.mobile__item::after {
  bottom: 7px;
}
.mobile__btn.active .mobile__item {
  background-color: transparent;
}
.mobile__btn.active .mobile__item::before {
  transform: rotate(45deg);
  top: 0;
}
.mobile__btn.active .mobile__item::after {
  transform: rotate(-45deg);
  bottom: 0;
}
@media (max-width: 520px) {
  .list {
    display: none;
  }
  .mobile__btn {
    display: block;
  }
}
</style>