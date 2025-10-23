<script setup>
import { ref, reactive } from 'vue'
import HeaderButton from '@/components/HeaderButton.vue'
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
  <header class="py-2 px-3 border-b border-gray-200 shadow-sm">
    <div class="flex items-center justify-between gap-3">
      <div class="text-lg font-bold">ToDo</div>
      <div class="flex items-center gap-10">
        <ul class="list flex gap-3">
          <router-link
            to="/"
            active-class="border-b-3 border-blue-400"
            class="hover:border-b-3 border-blue-400"
            >Все</router-link
          >
          <router-link
            class="hover:border-b-3 border-blue-400"
            active-class="border-b-3 border-blue-400"
            to="/notdone"
            >Не выполненные</router-link
          >
          <router-link
            class="hover:border-b-3 border-blue-400"
            active-class="border-b-3 border-blue-400 "
            :to="{ name: 'done' }"
            >Выполненные</router-link
          >
        </ul>
        <header-button @click="openModal" />
        <button
          @click="openMenu"
          :class="[
            'mobile__btn cursor-pointer',
            {
              active: mobileMenu,
            },
          ]"
        >
          <span class="mobile__item"></span>
        </button>
      </div>
    </div>
  </header>
  <Modal v-if="isOpen" @close-modal="isOpen = false">
    <input
      @input="validateTasksTitle(task.title)"
      v-model="task.title"
      class="border-1 py-2 px-3 rounded-lg"
      type="text"
      placeholder="Введите задачу"
    />
    <textarea
      @input="validateTasksDescription(task.description)"
      v-model="task.description"
      class="border-1 py-2 px-3 rounded-lg"
      name=""
      id=""
      placeholder="Введите описание"
    ></textarea>
    <ul class="flex gap-2">
      <li
        @click="addTopic(item)"
        :class="[
          'cursor-pointer bg-amber-200 rounded-full flex justify-center items-center p-1 hover:bg-amber-600 transition duration-300',
          {
            'bg-amber-600 ': task.topic === item.icon,
          },
        ]"
        v-for="(item, index) in store.menuItems"
        :key="index"
      >
        {{ item.icon }}
      </li>
    </ul>
    <button
      @click="addTask(task)"
      class="cursor-pointer bg-blue-400 p-2 text-white hover:bg-blue-800 transition duration-300 rounded-lg"
    >
      Добавить
    </button>
  </Modal>
  <div
    class="mobile__menu flex flex-col gap-3 bg-white absolute top-12 left-0 w-full p-4 border border-gray-200 rounded-lg shadow-lg z-index-10"
    v-if="mobileMenu"
  >
    <router-link class="cursor-pointer hover:bg-gray-200 p-2" to="/" @click="openMenu"
      >Все</router-link
    >
    <router-link class="cursor-pointer hover:bg-gray-200 p-2" to="/notdone" @click="openMenu"
      >Не выполненные</router-link
    >
    <router-link class="cursor-pointer hover:bg-gray-200 p-2" to="/done" @click="openMenu"
      >Выполненные</router-link
    >
  </div>
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