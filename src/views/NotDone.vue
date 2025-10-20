<script setup>
import Task from '@/components/Task.vue'
import { useTasksStore } from '@/stores/tasks'
const store = useTasksStore()
</script>

<template>
  <main class="p-4 mt-10">
    <h2 v-if="store.allTasks.length > 0" class="font-bold text-xl mb-6">
      Задачи: <span class="text-red-400">{{ store.allTasks.length }}</span>
    </h2>
    <ul class="flex flex-col gap-3">
      <Task
        :task="task"
        v-for="task in store.allTasks"
        :key="task.id"
        @is-done="store.taskDone(task.id)"
        @remove-task="store.removeTask(task.id)"
      />
      <h2 class="text-center mt-30 mb-5 text-xl text-gray-400" v-if="store.allTasks.length === 0">
        У вас нет задач, добавьте вашу первую задачу
      </h2>
    </ul>
  </main>
</template>
<style scoped></style>
