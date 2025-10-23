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
const getTopicColor = (topic) => {
  const topicColors = {
    '💼': '#8b5cf6', // purple
    '🎯': '#06b6d4', // cyan
    '📚': '#10b981', // emerald
    '🏠': '#f59e0b', // amber
    '🎨': '#ec4899', // pink
    '🚀': '#ef4444', // red
  }
  return topicColors[topic] || '#6b7280'
}
</script>
<template>
  <li
    @dblclick="openEditModal"
    :class="[
      'group relative rounded-2xl p-6 border-2 border-gray-50 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-sm',
      {
        'bg-gradient-to-br from-gray-50 to-gray-100/80 text-gray-500 line-through decoration-2':
          props.task.isDone,
        'bg-gradient-to-br from-white to-gray-50/80 hover:from-white hover:to-blue-50/50':
          !props.task.isDone,
      },
    ]"
  >
    <div
      class="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-300"
      :style="{ color: getTopicColor(props.task.topic) }"
    ></div>

    <div class="flex items-start gap-4 relative z-10">
      <div
        class="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
        :style="{
          backgroundColor: getTopicColor(props.task.topic),
          color: 'white',
        }"
      >
        {{ props.task.topic }}
      </div>

      <div class="flex-1 min-w-0">
        <h3
          :class="[
            'text-xl font-bold mb-2 transition-all duration-300',
            {
              'text-gray-500': props.task.isDone,
              'text-gray-800 group-hover:text-indigo-600': !props.task.isDone,
            },
          ]"
        >
          {{ props.task.title }}
        </h3>
        <p
          :class="[
            'text-gray-600 leading-relaxed transition-all duration-300',
            {
              'text-gray-400': props.task.isDone,
            },
          ]"
        >
          {{ props.task.description }}
        </p>

        <div class="flex items-center gap-2 mt-3">
          <div
            :class="[
              'w-3 h-3 rounded-full transition-all duration-300',
              {
                'bg-green-500 shadow-lg shadow-green-200': props.task.isDone,
                'bg-amber-500 shadow-lg shadow-amber-200 animate-pulse': !props.task.isDone,
              },
            ]"
          ></div>
          <span
            :class="[
              'text-sm font-medium transition-all duration-300',
              {
                'text-green-600': props.task.isDone,
                'text-amber-600': !props.task.isDone,
              },
            ]"
          >
            {{ props.task.isDone ? '✅ Выполнено' : '⏳ В процессе' }}
          </span>
        </div>
      </div>

      <div class="flex flex-col gap-3 items-center">
        <div class="relative">
          <input
            :checked="props.task.isDone"
            @click="$emit('is-done')"
            type="checkbox"
            class="sr-only"
            id="task-checkbox"
          />
          <label
            for="task-checkbox"
            :class="[
              'w-10 h-10 rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-lg',
              {
                'bg-green-500 border-green-500 text-white shadow-green-200': props.task.isDone,
                'bg-white border-gray-300 text-transparent hover:border-green-400 hover:bg-green-50':
                  !props.task.isDone,
              },
            ]"
          >
            <svg
              v-if="props.task.isDone"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </label>
        </div>

        <button
          @click.stop="$emit('remove-task')"
          class="w-10 h-10 rounded-xl bg-white border-2 border-gray-300 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-300 hover:bg-red-50 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-red-200 group/delete"
        >
          <TrashIcon
            class="w-5 h-5 transition-transform duration-300 group-hover/delete:scale-110"
          />
        </button>

        <div
          class="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1"
        >
          ✏️ двойной клик
        </div>
      </div>
    </div>

    <div
      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"
    ></div>
  </li>

  <Modal v-if="isOpen" @close-modal="isOpen = false">
    <div class="p-6 space-y-4 w-full max-w-md">
      <h2 class="text-xl font-bold text-gray-800 text-center">✏️ Редактировать задачу</h2>

      <div class="space-y-3">
        <div>
          <label class="block text-sm text-gray-600 mb-1">📝 Название задачи</label>
          <input
            v-model="editableTask.title"
            type="text"
            class="w-full border border-gray-300 py-2 px-3 rounded-lg focus:border-indigo-400 outline-none"
            placeholder="Введите название..."
          />
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1">📄 Описание</label>
          <textarea
            v-model="editableTask.description"
            class="w-full border border-gray-300 py-2 px-3 rounded-lg focus:border-indigo-400 outline-none resize-none h-24"
            placeholder="Введите описание..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-2">🎨 Выберите тему</label>
          <ul class="flex gap-2 flex-wrap">
            <li
              @click="addTopic(item)"
              v-for="(item, index) in store.menuItems"
              :key="index"
              :class="[
                'cursor-pointer w-10 h-10 rounded-lg flex justify-center items-center transition-all',
                {
                  'ring-2 ring-offset-1': editableTask.topic === item.icon,
                },
              ]"
              :style="{
                backgroundColor: editableTask.topic === item.icon ? item.color : '#f3f4f6',
                color: editableTask.topic === item.icon ? 'white' : '#6b7280',
              }"
            >
              {{ item.icon }}
            </li>
          </ul>
        </div>
      </div>

      <div class="flex gap-2 pt-2">
        <button
          @click="isOpen = false"
          class="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Отмена
        </button>
        <button
          @click="saveEdit"
          class="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Сохранить
        </button>
      </div>
    </div>
  </Modal>
</template>