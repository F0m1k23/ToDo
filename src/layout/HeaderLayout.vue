<script setup>
import { ref, reactive } from 'vue'
import HeaderButton from '@/components/HeaderButton.vue'
import Modal from '@/components/Modal/Modal.vue'
import { useTasksStore } from '@/stores/tasks'
const store = useTasksStore()
const isOpen = ref(false)
const openModal = () => {
  isOpen.value = !isOpen.value
}
const task = reactive({
  title: '',
  description: '',
  isDone: false,
})
const addTask = (task) => {
  store.addTask(task)
}
</script>
<template>
  <header class="py-2 px-3">
    <div class="flex items-center justify-between">
      <div class="text-lg font-bold">logo</div>
      <div class="flex items-center gap-10">
        <ul class="flex gap-3">
          <router-link to="/">Главная</router-link>
          <router-link :to="{ name: 'done' }">Выполненные</router-link>
        </ul>
        <header-button @click="openModal" />
      </div>
    </div>
  </header>
  <Modal v-if="isOpen" @close-modal="isOpen = false">
    <input
      v-model="task.title"
      class="border-1 py-2 px-3 rounded-lg"
      type="text"
      placeholder="Введите задачу"
    />
    <textarea
      v-model="task.description"
      class="border-1 py-2 px-3 rounded-lg"
      name=""
      id=""
      placeholder="Введите описание"
    ></textarea>
    <button
      @click="addTask(task)"
      class="cursor-pointer bg-blue-400 p-2 text-white hover:bg-blue-800 transition duration-300 rounded-lg"
    >
      Добавить
    </button>
  </Modal>
</template>