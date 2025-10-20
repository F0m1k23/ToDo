<script setup>
import { useTasksStore } from '@/stores/tasks'
import Task from '@/components/Task.vue'
const store = useTasksStore()
</script>
<template>
  <main class="p-4 mt-10">
    <h2 class="font-bold text-xl mb-6">
      Выполненные: <span class="text-red-400">{{ store.isDoneArray.length }}</span>
    </h2>
    <ul class="flex flex-col gap-3">
      <Task
        :task="task"
        v-for="task in store.isDoneArray"
        :key="task.id"
        @is-done="store.taskDone(task.id)"
        @remove-task="store.removeTask(task.id)"
      />
      <h2 v-if="store.isDoneArray === 0" class="text-center mt-30 mb-5 text-xl text-gray-400">
        У вас нет завершенных задач
      </h2>
    </ul>
  </main>
</template>