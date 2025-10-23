<script setup>
import { ref } from 'vue'
import Modal from './Modal/Modal.vue'
import { TrashIcon } from '@heroicons/vue/24/solid'
import { useTasksStore } from '@/stores/tasks'
const store = useTasksStore()
const isOpen = ref(false)
const props = defineProps({
  task: {
    type: Object,
  },
})
const editableTask = ref(null)
const openEditModal = () => {
  editableTask.value = { ...props.task }
  isOpen.value = true
}
const addTopic = (item) => {
  editableTask.value.topic = item.icon
}
const saveEdit = () => {
  if (!editableTask.value) return

  store.editTask(editableTask.value)
  isOpen.value = false
  console.log(editableTask.value)
}
</script>
<template>
  <li
    @dblclick="openEditModal"
    :class="[
      ' rounded-lg py-3 px-3 border border-gray-100 shadow-sm hover:translate-y-0.5 transition duration-300 cursor-pointer ',
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
  <Modal v-if="isOpen" @close-modal="isOpen = false">
    <input v-model="editableTask.title" type="text" class="border-1 py-2 px-3 rounded-lg" />
    <textarea
      v-model="editableTask.description"
      name=""
      id=""
      class="border-1 py-2 px-3 rounded-lg"
    ></textarea>
    <ul class="flex gap-2">
      <li
        @click="addTopic(item)"
        v-for="(item, index) in store.menuItems"
        :key="index"
        :class="[
          'cursor-pointer bg-amber-200 rounded-full flex justify-center items-center p-1 hover:bg-amber-600 transition duration-300',
          {
            'bg-amber-600 ': editableTask.topic === item.icon,
          },
        ]"
      >
        {{ item.icon }}
      </li>
    </ul>
    <button
      @click="saveEdit"
      class="cursor-pointer bg-blue-400 p-2 text-white hover:bg-blue-800 transition duration-300 rounded-lg"
    >
      Изменить
    </button>
  </Modal>
</template>