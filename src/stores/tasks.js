import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([])
  const menuItems = [
    { icon: '🏠', label: 'Дом' },
    { icon: '🚀', label: 'Учеба' },
    { icon: '💡', label: 'Идеи' },
    { icon: '👤', label: 'Работа' },
    { icon: '🎯', label: 'Цели' },
  ]

  if (localStorage.getItem('tasks')) {
    try {
      tasks.value = JSON.parse(localStorage.getItem('tasks'))
    } catch (e) {
      console.log(e, 'Ошибка сохранения')
      tasks.value = []
    }
  }
  const addTask = (task) => {
    tasks.value.push({
      id: Date.now(),
      title: task.title,
      description: task.description,
      isDone: task.isDone,
      topic: task.topic,
    })
  }

  const removeTask = (id) => {
    const taskId = tasks.value.find((item) => item.id === id)
    tasks.value = tasks.value.filter((task) => task !== taskId)
  }

  const taskDone = (id) => {
    const taskId = tasks.value.find((item) => item.id === id)
    taskId.isDone = !taskId.isDone
  }
  const allTasks = computed(() => tasks.value.filter((task) => !task.isDone))
  const isDoneArray = computed(() => tasks.value.filter((task) => task.isDone))

  watch(
    tasks,
    (newTask) => {
      localStorage.setItem('tasks', JSON.stringify(newTask))
    },
    {
      deep: true,
    },
  )

  return { tasks, addTask, removeTask, taskDone, isDoneArray, allTasks, menuItems }
})
